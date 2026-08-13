import { o as __toESM } from "../_runtime.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/convert-r4oaTcFg.js
var FORMAT_META = {
	"image/jpeg": {
		label: "JPEG",
		ext: "jpg",
		quality: true
	},
	"image/png": {
		label: "PNG",
		ext: "png",
		quality: false
	},
	"image/webp": {
		label: "WebP",
		ext: "webp",
		quality: true
	}
};
var ACCEPTED_LABEL = "HEIC and HEIF";
var MAX_FILE_BYTES = 83886080;
var HEIC_EXT = /\.(heic|heif)$/i;
var HEIC_BRANDS = /* @__PURE__ */ new Set([
	"heic",
	"heix",
	"hevc",
	"hevx",
	"mif1",
	"msf1"
]);
function inspectHeicHeader(bytes) {
	const brands = [];
	if (bytes.length >= 12 && ascii(bytes, 4, 4) === "ftyp") for (let offset = 8; offset + 4 <= Math.min(bytes.length, 64); offset += 4) {
		const brand = brandAt(bytes, offset);
		if (brand) brands.push(brand);
	}
	const blob = ascii(bytes, 0, Math.min(bytes.length, 256)).toLowerCase();
	const sequence = brands.includes("msf1") || blob.includes("msf1");
	const hdr = brands.some((b) => [
		"heix",
		"hevx",
		"hdrv"
	].includes(b)) || blob.includes("hdrv") || blob.includes("tmap");
	return {
		kind: sequence ? "sequence" : hdr ? "hdr" : "still",
		brands
	};
}
function isHeicName(name) {
	return HEIC_EXT.test(name);
}
function outputName(originalName, format) {
	return `${originalName.replace(HEIC_EXT, "").trim() || "image"}.${FORMAT_META[format].ext}`;
}
function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1048576) return `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`;
	return `${(n / 1048576).toFixed(2)} MB`;
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function ascii(bytes, start, length) {
	let out = "";
	for (let i = 0; i < length && start + i < bytes.length; i += 1) out += String.fromCharCode(bytes[start + i] ?? 0);
	return out;
}
function brandAt(bytes, offset) {
	return ascii(bytes, offset, 4).replace(/\0/g, " ").trim().toLowerCase();
}
function sniffContainer(bytes) {
	if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "JPEG";
	if (bytes.length >= 8 && bytes[0] === 137 && ascii(bytes, 1, 3) === "PNG") return "PNG";
	if (bytes.length >= 6 && ascii(bytes, 0, 3) === "GIF") return "GIF";
	if (bytes.length >= 2 && bytes[0] === 66 && bytes[1] === 77) return "BMP";
	if (bytes.length >= 12 && ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") return "WebP";
	if (bytes.length >= 12 && ascii(bytes, 4, 4) === "ftyp") {
		const brands = [];
		for (let offset = 8; offset + 4 <= Math.min(bytes.length, 32); offset += 4) {
			const brand = brandAt(bytes, offset);
			if (brand) brands.push(brand);
		}
		if (brands.some((b) => HEIC_BRANDS.has(b))) return "heic";
		if (brands.includes("qt")) return "QuickTime / MOV";
		if (brands.some((b) => [
			"isom",
			"mp41",
			"mp42",
			"avc1",
			"iso2"
		].includes(b))) return "MP4";
		return "another media file";
	}
	return null;
}
async function validateHeicFile(file) {
	if (!file || file.size === 0) return {
		ok: false,
		reason: "File is empty"
	};
	if (file.size > 83886080) return {
		ok: false,
		reason: `Larger than ${formatBytes(MAX_FILE_BYTES)}`
	};
	const header = new Uint8Array(await file.slice(0, 256).arrayBuffer());
	if (header.length < 12) return {
		ok: false,
		reason: "File is too small to be HEIC"
	};
	const kind = sniffContainer(header);
	if (kind === "heic") {
		const { kind: profile } = inspectHeicHeader(header);
		if (profile === "sequence") return {
			ok: true,
			kind: "sequence",
			note: "Live Photo or burst. We’ll convert the still; the motion clip is dropped."
		};
		if (profile === "hdr") return {
			ok: true,
			kind: "hdr",
			note: "Looks like HDR. The export is a standard photo — extra brightness may flatten."
		};
		return {
			ok: true,
			kind: "still"
		};
	}
	if (kind) {
		if (isHeicName(file.name) || /heic|heif/i.test(file.type)) return {
			ok: false,
			reason: `Named HEIC, but the contents are ${kind}.`
		};
		return {
			ok: false,
			reason: `${kind} is not supported. Use ${ACCEPTED_LABEL}.`
		};
	}
	if (isHeicName(file.name) || /heic|heif/i.test(file.type)) return {
		ok: false,
		reason: "This file is named HEIC but the contents are not."
	};
	return {
		ok: false,
		reason: `Not a HEIC or HEIF file`
	};
}
var heicMod = null;
function loadHeic() {
	if (!heicMod) heicMod = import("../_libs/heic-to.mjs").then((n) => n.t);
	return heicMod;
}
function explainConvertError(err, kind) {
	const lower = (err instanceof Error ? err.message : "Could not convert this file").toLowerCase();
	if (kind === "sequence" || /sequence|live photo|multi.?image/i.test(lower)) return "This looks like a Live Photo or burst. Lumen can only export the still frame — try a single photo, or export JPEG from the iPhone first.";
	if (kind === "hdr" || /hdr|gain.?map|bit.?depth/i.test(lower)) return "This may be an HDR HEIC. The extra brightness layer often fails in the browser. Export JPEG from the Photos app, or try another shot.";
	if (/memory|allocation|out of memory/i.test(lower)) return "This photo is too large for this browser tab. Try one file at a time, or a smaller original.";
	return "Could not decode this HEIC. It may be a Live Photo, HDR shot, or an unusual camera file.";
}
async function convertHeic(file, format, quality, options) {
	const { heicTo } = await loadHeic();
	const q = Math.min(1, Math.max(.1, quality));
	const bitmap = await heicTo({
		blob: file,
		type: "bitmap"
	});
	const width = bitmap.width;
	const height = bitmap.height;
	try {
		let blob = await heicTo({
			blob: file,
			type: format,
			quality: q
		});
		let kept;
		if (options?.keepMetadata && format === "image/jpeg") {
			const { keepJpegMetadata } = await import("./exif-keep-Fac2pIoU.mjs");
			const copied = await keepJpegMetadata(file, blob);
			blob = copied.blob;
			kept = copied.kept;
		}
		return {
			blob,
			width,
			height,
			kept
		};
	} finally {
		bitmap.close();
	}
}
var COMPARE_JPEG_STEPS = [
	.6,
	.75,
	.85,
	.95
];
async function measureAgainstHeic(file, quality) {
	const { heicTo } = await loadHeic();
	const q = Math.min(1, Math.max(.1, quality));
	const bitmap = await heicTo({
		blob: file,
		type: "bitmap"
	});
	const width = bitmap.width;
	const height = bitmap.height;
	try {
		if (typeof OffscreenCanvas === "undefined") {
			const [jpeg, webp, png, webp85, ...stepBlobs] = await Promise.all([
				heicTo({
					blob: file,
					type: "image/jpeg",
					quality: q
				}),
				heicTo({
					blob: file,
					type: "image/webp",
					quality: q
				}),
				heicTo({
					blob: file,
					type: "image/png"
				}),
				heicTo({
					blob: file,
					type: "image/webp",
					quality: .85
				}),
				...COMPARE_JPEG_STEPS.map((step) => heicTo({
					blob: file,
					type: "image/jpeg",
					quality: step
				}))
			]);
			return {
				width,
				height,
				heicBytes: file.size,
				jpeg,
				webp,
				png,
				webpAt85: webp85.size,
				jpegSteps: COMPARE_JPEG_STEPS.map((step, i) => ({
					quality: step,
					blob: stepBlobs[i] ?? jpeg
				}))
			};
		}
		const canvas = new OffscreenCanvas(width, height);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Could not draw this photo");
		ctx.drawImage(bitmap, 0, 0);
		const jpeg = await canvas.convertToBlob({
			type: "image/jpeg",
			quality: q
		});
		const webp = await canvas.convertToBlob({
			type: "image/webp",
			quality: q
		});
		const png = await canvas.convertToBlob({ type: "image/png" });
		const webp85 = await canvas.convertToBlob({
			type: "image/webp",
			quality: .85
		});
		const jpegSteps = [];
		for (const step of COMPARE_JPEG_STEPS) {
			const blob = await canvas.convertToBlob({
				type: "image/jpeg",
				quality: step
			});
			jpegSteps.push({
				quality: step,
				blob
			});
		}
		return {
			width,
			height,
			heicBytes: file.size,
			jpeg,
			webp,
			png,
			webpAt85: webp85.size,
			jpegSteps
		};
	} finally {
		bitmap.close();
	}
}
async function encodeJpegQualities(file, qualities) {
	const { heicTo } = await loadHeic();
	const bitmap = await heicTo({
		blob: file,
		type: "bitmap"
	});
	const width = bitmap.width;
	const height = bitmap.height;
	const frames = [];
	try {
		if (typeof OffscreenCanvas === "undefined") {
			for (const quality of qualities) {
				const q = Math.min(1, Math.max(.1, quality));
				const blob = await heicTo({
					blob: file,
					type: "image/jpeg",
					quality: q
				});
				frames.push({
					quality: q,
					blob
				});
			}
			return {
				width,
				height,
				frames
			};
		}
		const canvas = new OffscreenCanvas(width, height);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Could not draw this photo");
		ctx.drawImage(bitmap, 0, 0);
		for (const quality of qualities) {
			const q = Math.min(1, Math.max(.1, quality));
			const blob = await canvas.convertToBlob({
				type: "image/jpeg",
				quality: q
			});
			frames.push({
				quality: q,
				blob
			});
		}
		return {
			width,
			height,
			frames
		};
	} finally {
		bitmap.close();
	}
}
async function zipConverted(files) {
	const { default: JSZip } = await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const zip = new JSZip();
	const used = /* @__PURE__ */ new Map();
	for (const file of files) {
		const count = used.get(file.name) ?? 0;
		used.set(file.name, count + 1);
		const name = count === 0 ? file.name : file.name.replace(/(\.[^.]+)$/, `-${count}$1`);
		zip.file(name, file.blob);
	}
	return zip.generateAsync({ type: "blob" });
}
//#endregion
export { encodeJpegQualities as a, measureAgainstHeic as c, zipConverted as d, downloadBlob as i, outputName as l, FORMAT_META as n, explainConvertError as o, convertHeic as r, formatBytes as s, ACCEPTED_LABEL as t, validateHeicFile as u };
