//#region node_modules/.nitro/vite/services/ssr/assets/exif-keep-Fac2pIoU.js
function ascii(s) {
	const out = new Uint8Array(s.length);
	for (let i = 0; i < s.length; i += 1) out[i] = s.charCodeAt(i) & 255;
	return out;
}
function u16(n, le) {
	const b = /* @__PURE__ */ new Uint8Array(2);
	new DataView(b.buffer).setUint16(0, n, le);
	return b;
}
function u32(n, le) {
	const b = /* @__PURE__ */ new Uint8Array(4);
	new DataView(b.buffer).setUint32(0, n, le);
	return b;
}
function concat(parts) {
	const len = parts.reduce((a, p) => a + p.length, 0);
	const out = new Uint8Array(len);
	let o = 0;
	for (const p of parts) {
		out.set(p, o);
		o += p.length;
	}
	return out;
}
function rational(num, den, le) {
	return concat([u32(num >>> 0, le), u32(den >>> 0, le)]);
}
function degToDms(deg) {
	const abs = Math.abs(deg);
	const d = Math.floor(abs);
	const mFloat = (abs - d) * 60;
	const m = Math.floor(mFloat);
	return {
		d,
		m,
		s: Math.round((mFloat - m) * 60 * 100),
		ref: deg >= 0
	};
}
/** Insert a small EXIF APP1 into a JPEG so date / camera / GPS can survive. */
function injectJpegExif(jpeg, tags) {
	if (jpeg.length < 4 || jpeg[0] !== 255 || jpeg[1] !== 216) return jpeg;
	const le = true;
	const entries = [];
	const extras = [];
	function addAscii(tag, value) {
		const data = ascii(`${value}\0`);
		entries.push({
			tag,
			type: 2,
			count: data.length,
			data
		});
	}
	if (tags.make) addAscii(271, tags.make.slice(0, 32));
	if (tags.model) addAscii(272, tags.model.slice(0, 32));
	if (tags.date) addAscii(306, tags.date);
	let gpsOffsetSlot = -1;
	if (tags.lat != null && tags.lng != null) {
		gpsOffsetSlot = entries.length;
		entries.push({
			tag: 34853,
			type: 4,
			count: 1,
			data: u32(0, le)
		});
	}
	let dataOff = 8 + (2 + entries.length * 12 + 4);
	const entryBytes = [];
	for (const entry of entries) {
		const inline = entry.data.length <= 4;
		const rec = /* @__PURE__ */ new Uint8Array(12);
		const v = new DataView(rec.buffer);
		v.setUint16(0, entry.tag, le);
		v.setUint16(2, entry.type, le);
		v.setUint32(4, entry.count, le);
		if (inline) rec.set(entry.data, 8);
		else {
			v.setUint32(8, dataOff, le);
			extras.push(entry.data);
			dataOff += entry.data.length;
		}
		entryBytes.push(rec);
	}
	let gpsBlock = /* @__PURE__ */ new Uint8Array(0);
	if (tags.lat != null && tags.lng != null && gpsOffsetSlot >= 0) {
		const lat = degToDms(tags.lat);
		const lng = degToDms(tags.lng);
		const gpsEntries = 5;
		const gpsDataStart = dataOff + 66;
		const slot = entryBytes[gpsOffsetSlot];
		if (slot) new DataView(slot.buffer).setUint32(8, dataOff, le);
		const gpsRecs = [];
		const gpsExtra = [];
		let gOff = gpsDataStart;
		function gpsEntry(tag, type, count, data) {
			const rec = /* @__PURE__ */ new Uint8Array(12);
			const v = new DataView(rec.buffer);
			v.setUint16(0, tag, le);
			v.setUint16(2, type, le);
			v.setUint32(4, count, le);
			if (data.length <= 4) rec.set(data, 8);
			else {
				v.setUint32(8, gOff, le);
				gpsExtra.push(data);
				gOff += data.length;
			}
			gpsRecs.push(rec);
		}
		gpsEntry(1, 2, 2, ascii(lat.ref ? "N\0" : "S\0"));
		gpsEntry(2, 5, 3, concat([
			rational(lat.d, 1, le),
			rational(lat.m, 1, le),
			rational(lat.s, 100, le)
		]));
		gpsEntry(3, 2, 2, ascii(lng.ref ? "E\0" : "W\0"));
		gpsEntry(4, 5, 3, concat([
			rational(lng.d, 1, le),
			rational(lng.m, 1, le),
			rational(lng.s, 100, le)
		]));
		gpsEntry(6, 5, 1, rational(0, 1, le));
		gpsBlock = concat([
			u16(gpsEntries, le),
			...gpsRecs,
			u32(0, le),
			...gpsExtra
		]);
	}
	const tiff = concat([
		ascii("II"),
		u16(42, le),
		u32(8, le),
		u16(entries.length, le),
		...entryBytes,
		u32(0, le),
		...extras,
		gpsBlock
	]);
	const app1 = concat([
		new Uint8Array([255, 225]),
		u16(tiff.length + 8, false),
		ascii("Exif\0\0"),
		tiff
	]);
	let insertAt = 2;
	while (insertAt + 4 < jpeg.length && jpeg[insertAt] === 255) {
		const marker = jpeg[insertAt + 1] ?? 0;
		if (marker === 218 || marker === 217) break;
		if (marker === 216) {
			insertAt += 2;
			continue;
		}
		if (marker >= 224 && marker <= 239) {
			const size = jpeg[insertAt + 2] << 8 | jpeg[insertAt + 3];
			insertAt += 2 + size;
			continue;
		}
		break;
	}
	return concat([
		jpeg.slice(0, insertAt),
		app1,
		jpeg.slice(insertAt)
	]);
}
async function keepJpegMetadata(source, jpeg) {
	try {
		const parsed = await (await import("../_libs/exifr.mjs").then((n) => n.t)).default.parse(source, {
			gps: true,
			tiff: true,
			exif: true,
			reviveValues: true
		});
		if (!parsed) return {
			blob: jpeg,
			kept: []
		};
		const tags = {};
		const kept = [];
		const make = parsed.Make ?? parsed.make;
		const model = parsed.Model ?? parsed.model;
		const date = parsed.DateTimeOriginal ?? parsed.CreateDate ?? parsed.ModifyDate;
		const lat = parsed.latitude ?? parsed.Latitude;
		const lng = parsed.longitude ?? parsed.Longitude;
		if (typeof make === "string" && make.trim()) {
			tags.make = make.trim();
			kept.push("camera");
		}
		if (typeof model === "string" && model.trim()) {
			tags.model = model.trim();
			if (!kept.includes("camera")) kept.push("camera");
		}
		if (date instanceof Date && !Number.isNaN(date.getTime())) {
			const pad = (n) => String(n).padStart(2, "0");
			tags.date = `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
			kept.push("date");
		} else if (typeof date === "string" && date.length >= 10) {
			tags.date = date.slice(0, 19);
			kept.push("date");
		}
		if (typeof lat === "number" && typeof lng === "number") {
			tags.lat = lat;
			tags.lng = lng;
			kept.push("GPS");
		}
		if (kept.length === 0) return {
			blob: jpeg,
			kept: []
		};
		const bytes = injectJpegExif(new Uint8Array(await jpeg.arrayBuffer()), tags);
		const copy = new Uint8Array(bytes);
		return {
			blob: new Blob([copy], { type: "image/jpeg" }),
			kept
		};
	} catch {
		return {
			blob: jpeg,
			kept: []
		};
	}
}
//#endregion
export { keepJpegMetadata };
