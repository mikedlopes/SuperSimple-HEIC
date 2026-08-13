import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BCD9ooFK.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
import { a as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as WipeCompare, t as SideBySide } from "./side-by-side-DPQsrBU0.mjs";
import { t as LearnStrip } from "./learn-strip-BbfiUuRO.mjs";
import { a as encodeJpegQualities, s as formatBytes } from "./convert-r4oaTcFg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jpeg-artifacts-LFsM_4it.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function makeCanvas(width, height) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not draw example");
	return {
		canvas,
		ctx
	};
}
function toBlob(canvas, type, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("encode failed")), type, quality);
	});
}
function drawBlocking(ctx, w, h) {
	const fill = ctx.createLinearGradient(0, 0, w, h);
	fill.addColorStop(0, "rgb(118, 136, 128)");
	fill.addColorStop(1, "rgb(142, 154, 146)");
	ctx.fillStyle = fill;
	ctx.fillRect(0, 0, w, h);
}
function drawBanding(ctx, w, h) {
	const fill = ctx.createLinearGradient(0, 0, 0, h);
	fill.addColorStop(0, "rgb(28, 62, 128)");
	fill.addColorStop(.45, "rgb(92, 126, 168)");
	fill.addColorStop(.72, "rgb(196, 154, 118)");
	fill.addColorStop(1, "rgb(228, 176, 132)");
	ctx.fillStyle = fill;
	ctx.fillRect(0, 0, w, h);
}
function drawMosquito(ctx, w, h) {
	ctx.fillStyle = "rgb(214, 226, 236)";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "rgb(12, 16, 20)";
	ctx.lineWidth = 1;
	const cx = w * .5;
	const cy = h * .52;
	for (let i = 0; i < 28; i += 1) {
		const a = i / 28 * Math.PI * 2;
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.lineTo(cx + Math.cos(a) * w * .48, cy + Math.sin(a) * h * .48);
		ctx.stroke();
	}
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(cx, cy, Math.min(w, h) * .18, 0, Math.PI * 2);
	ctx.stroke();
}
function drawSmear(ctx, w, h) {
	ctx.fillStyle = "rgb(18, 46, 168)";
	ctx.fillRect(0, 0, w, h);
	const colors = [
		"rgb(232, 28, 48)",
		"rgb(252, 214, 12)",
		"rgb(24, 214, 196)",
		"rgb(236, 48, 168)"
	];
	const stripe = 7;
	let x = w * .18;
	for (const color of colors) {
		ctx.fillStyle = color;
		ctx.fillRect(x, h * .12, stripe, h * .76);
		x += 25;
	}
	ctx.fillStyle = "rgb(248, 36, 64)";
	ctx.beginPath();
	ctx.arc(w * .78, h * .5, h * .22, 0, Math.PI * 2);
	ctx.fill();
}
function drawHalo(ctx, w, h) {
	ctx.fillStyle = "rgb(244, 244, 240)";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "rgb(8, 8, 10)";
	ctx.beginPath();
	ctx.arc(w * .5, h * .5, Math.min(w, h) * .28, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillRect(w * .12, h * .42, w * .2, h * .16);
}
function drawBusy(ctx, w, h) {
	drawBanding(ctx, w, h);
	drawMosquito(ctx, w, h);
	ctx.globalAlpha = .55;
	drawSmear(ctx, w, h);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "rgb(250, 250, 246)";
	ctx.font = `600 ${Math.round(h * .22)}px "IBM Plex Sans", sans-serif`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("JPEG", w * .5, h * .5);
}
async function pair(draw, quality, size = 360) {
	const { canvas, ctx } = makeCanvas(size, Math.round(size * .68));
	draw(ctx, canvas.width, canvas.height);
	return {
		clean: await toBlob(canvas, "image/png"),
		dirty: await toBlob(canvas, "image/jpeg", quality)
	};
}
async function generationPair() {
	const { canvas, ctx } = makeCanvas(360, 240);
	drawBusy(ctx, canvas.width, canvas.height);
	const clean = await toBlob(canvas, "image/png");
	let blob = await toBlob(canvas, "image/jpeg", .35);
	for (let i = 0; i < 10; i += 1) {
		const url = URL.createObjectURL(blob);
		await new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				URL.revokeObjectURL(url);
				resolve();
			};
			img.onerror = () => {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("reload failed"));
			};
			img.src = url;
		});
		blob = await toBlob(canvas, "image/jpeg", .35);
	}
	return {
		clean,
		dirty: blob
	};
}
async function buildArtifactDemos() {
	const blocking = await pair(drawBlocking, .08);
	const banding = await pair(drawBanding, .12);
	const mosquito = await pair(drawMosquito, .18);
	const smear = await pair(drawSmear, .12);
	const halo = await pair(drawHalo, .16);
	const generations = await generationPair();
	return [
		{
			id: "blocking",
			name: "Blocking",
			look: "A faint checkerboard",
			body: "JPEG cuts the photo into tiny squares — 8 pixels on a side — and squeezes each square on its own. When it squeezes too hard, the squares show up as a grid. Skies, walls, and skin show it first.",
			cleanLabel: "Smooth wash",
			dirtyLabel: "Quality 8 JPEG",
			...blocking
		},
		{
			id: "banding",
			name: "Banding",
			look: "Stripes in a smooth fade",
			body: "A sunset or a plain wall should change color gradually. JPEG has fewer shades left, so the fade turns into steps — like a cheap gradient.",
			cleanLabel: "True fade",
			dirtyLabel: "Quality 12 JPEG",
			...banding
		},
		{
			id: "mosquito",
			name: "Mosquito noise",
			look: "Sparkles around edges",
			body: "High-contrast lines — a branch against the sky, type on a sign — grow a haze of specks. People nicknamed it mosquitoes. It buzzes around the edge instead of staying sharp.",
			cleanLabel: "Clean lines",
			dirtyLabel: "Quality 18 JPEG",
			...mosquito
		},
		{
			id: "smear",
			name: "Color smear",
			look: "Reds and blues that leak",
			body: "JPEG keeps brightness in more detail than color. Fine color — a red jacket, a neon stripe — can bleed into the pixels next door.",
			cleanLabel: "Hard color edges",
			dirtyLabel: "Quality 12 JPEG",
			...smear
		},
		{
			id: "halo",
			name: "Halos",
			look: "A glow around dark / light edges",
			body: "Also called ringing. A dark shape on a bright field can pick up a pale outline that was never in the picture.",
			cleanLabel: "Sharp silhouette",
			dirtyLabel: "Quality 16 JPEG",
			...halo
		},
		{
			id: "generations",
			name: "Generation loss",
			look: "Worse each time you save",
			body: "Each JPEG save takes another bite. This pair is the same drawing: once as a clean PNG, then after eleven harsh JPEG saves. The leftovers stack. You cannot undo them.",
			cleanLabel: "Original",
			dirtyLabel: "Saved 11 times",
			...generations
		}
	];
}
var SAMPLE_PATH = "/samples/autumn.heic";
function JpegArtifacts() {
	const [frames, setFrames] = (0, import_react.useState)([]);
	const [demos, setDemos] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const urlsRef = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const [sampleRes, built] = await Promise.all([fetch(SAMPLE_PATH).then(async (res) => {
					if (!res.ok) throw new Error("missing sample");
					const blob = await res.blob();
					const file = new File([blob], "autumn.heic", { type: "image/heic" });
					return encodeJpegQualities(file, [.3, .85]);
				}), buildArtifactDemos()]);
				if (cancelled) return;
				const nextFrames = sampleRes.frames.map((frame) => {
					const url = URL.createObjectURL(frame.blob);
					urlsRef.current.push(url);
					return {
						quality: frame.quality,
						bytes: frame.blob.size,
						url
					};
				});
				const nextDemos = built.map((demo) => {
					const cleanUrl = URL.createObjectURL(demo.clean);
					const dirtyUrl = URL.createObjectURL(demo.dirty);
					urlsRef.current.push(cleanUrl, dirtyUrl);
					return {
						...demo,
						cleanUrl,
						dirtyUrl
					};
				});
				setFrames(nextFrames);
				setDemos(nextDemos);
			} catch {
				if (!cancelled) setError("Could not build the example photos.");
			}
		})();
		return () => {
			cancelled = true;
			for (const url of urlsRef.current) URL.revokeObjectURL(url);
			urlsRef.current = [];
		};
	}, []);
	const harsh = frames.find((f) => f.quality === .3);
	const gentle = frames.find((f) => f.quality === .85);
	const [showDrawings, setShowDrawings] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-8 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "stagger-in max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "JPEG leftovers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
						children: "Those squares and sparkles have a name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-pretty text-muted",
						children: "When a JPEG gets too small, it does not fail cleanly. It leaves marks — artifacts — that were never in the real scene. Each pair below is a clean original next to a harsh JPEG, encoded in this browser so the damage is real."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger-in mt-8",
				style: { animationDelay: "20ms" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStrip, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-10 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6",
				style: { animationDelay: "50ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight text-fg",
						children: "Drag to compare"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-pretty text-muted",
						children: "Same HEIC, same crop. Typical JPEG on the left, crushed on the right. A smooth sky is below — that is where banding shows first."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: harsh && gentle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WipeCompare, {
							leftSrc: gentle.url,
							rightSrc: harsh.url,
							leftLabel: `Quality 85 · ${formatBytes(gentle.bytes)}`,
							rightLabel: `Quality 30 · ${formatBytes(harsh.bytes)}`,
							leftAlt: "Typical JPEG at quality 85",
							rightAlt: "Heavy JPEG artifacts at quality 30",
							zoom: true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid aspect-[4/3] place-items-center rounded-xl bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-fg" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyWipe, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "60ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "More examples"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-pretty text-muted",
						children: "Drawn pairs for blocking, banding, mosquito noise, and the rest — if you want the names that show up in photo forums."
					}),
					!showDrawings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "mt-4",
						onClick: () => setShowDrawings(true),
						children: "Show drawings"
					}) : demos.length === 0 && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid place-items-center rounded-xl bg-surface py-16 shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-fg" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-8",
						children: demos.map((demo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium text-fg",
									children: demo.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: demo.look
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideBySide, {
								leftSrc: demo.cleanUrl,
								rightSrc: demo.dirtyUrl,
								leftLabel: demo.cleanLabel,
								rightLabel: demo.dirtyLabel,
								leftAlt: `${demo.name}, clean original`,
								rightAlt: `${demo.name}, after harsh JPEG`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-pretty text-muted",
								children: demo.body
							})
						] }, demo.id))
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-danger",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "120ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "Keep them down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-pretty text-muted",
						children: "An artifact is a leftover of the squeeze — blocks, stripes, sparkles. They live in the file. JPEG takes a bite every time you save. Export from HEIC once, around quality 80–85, and keep the HEIC as the original."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Convert a HEIC"
							})
						})
					})
				]
			})
		]
	});
}
function SkyWipe() {
	const [pair, setPair] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const urls = [];
		let cancelled = false;
		(async () => {
			const canvas = document.createElement("canvas");
			canvas.width = 960;
			canvas.height = 720;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
			sky.addColorStop(0, "rgb(28, 62, 128)");
			sky.addColorStop(.42, "rgb(92, 132, 176)");
			sky.addColorStop(.7, "rgb(196, 162, 132)");
			sky.addColorStop(1, "rgb(228, 184, 140)");
			ctx.fillStyle = sky;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(22, 36, 28)";
			ctx.beginPath();
			ctx.moveTo(0, canvas.height * .82);
			for (let x = 0; x <= canvas.width; x += 16) {
				const y = canvas.height * .8 + Math.sin(x * .02) * 18 + Math.sin(x * .07) * 10;
				ctx.lineTo(x, y);
			}
			ctx.lineTo(canvas.width, canvas.height);
			ctx.lineTo(0, canvas.height);
			ctx.fill();
			const gentle = await new Promise((res) => canvas.toBlob(res, "image/jpeg", .85));
			const harsh = await new Promise((res) => canvas.toBlob(res, "image/jpeg", .3));
			if (cancelled || !gentle || !harsh) return;
			const a = URL.createObjectURL(gentle);
			const b = URL.createObjectURL(harsh);
			urls.push(a, b);
			setPair({
				gentle: a,
				harsh: b
			});
		})();
		return () => {
			cancelled = true;
			for (const url of urls) URL.revokeObjectURL(url);
		};
	}, []);
	if (!pair) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm text-muted",
			children: "A sky. Banding shows up here first."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WipeCompare, {
			leftSrc: pair.gentle,
			rightSrc: pair.harsh,
			leftLabel: "Sky · quality 85",
			rightLabel: "Sky · quality 30",
			leftAlt: "Smooth sky at JPEG quality 85",
			rightAlt: "Banded sky at JPEG quality 30"
		})]
	});
}
function ArtifactsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JpegArtifacts, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { note: "Examples are encoded in your browser from the sample photo." })
		]
	});
}
//#endregion
export { ArtifactsPage as component };
