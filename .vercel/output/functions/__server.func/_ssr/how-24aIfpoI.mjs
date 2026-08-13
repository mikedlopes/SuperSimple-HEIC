import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BCD9ooFK.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
import { a as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as LearnStrip } from "./learn-strip-BbfiUuRO.mjs";
import { t as Slider } from "./slider-S2jl3B4-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-24aIfpoI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function lumaAt(data, width, x, y) {
	const i = (y * width + x) * 4;
	return .2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2];
}
function regionEnergy(data, width, height, x, y, w, h) {
	const x1 = Math.min(width, x + w);
	const y1 = Math.min(height, y + h);
	let sum = 0;
	let sum2 = 0;
	let n = 0;
	const step = Math.max(1, Math.floor(Math.min(w, h) / 12));
	for (let yy = y; yy < y1; yy += step) for (let xx = x; xx < x1; xx += step) {
		const l = lumaAt(data, width, xx, yy);
		sum += l;
		sum2 += l * l;
		n += 1;
	}
	if (n < 2) return 0;
	const mean = sum / n;
	return sum2 / n - mean * mean;
}
/** Adaptive blocks: keep big tiles on calm sky, split where the picture changes. */
function adaptiveBlocks(data, width, height, minSize, threshold) {
	const out = [];
	function walk(x, y, w, h) {
		const energy = regionEnergy(data, width, height, x, y, w, h);
		if (w >= minSize * 2 && h >= minSize * 2 && energy > threshold) {
			const hw = Math.floor(w / 2);
			const hh = Math.floor(h / 2);
			walk(x, y, hw, hh);
			walk(x + hw, y, w - hw, hh);
			walk(x, y + hh, hw, h - hh);
			walk(x + hw, y + hh, w - hw, h - hh);
			return;
		}
		out.push({
			x,
			y,
			w,
			h
		});
	}
	const tile = 64;
	for (let y = 0; y < height; y += tile) for (let x = 0; x < width; x += tile) walk(x, y, Math.min(tile, width - x), Math.min(tile, height - y));
	return out;
}
function gridBlocks(width, height, size) {
	const out = [];
	for (let y = 0; y < height; y += size) for (let x = 0; x < width; x += size) out.push({
		x,
		y,
		w: Math.min(size, width - x),
		h: Math.min(size, height - y)
	});
	return out;
}
var SAMPLE_PATH = "/samples/autumn.heic";
var STEPS = [
	{
		n: "1",
		title: "Cut the photo into tiles",
		body: "JPEG always uses the same tiny squares — 8 by 8 pixels. HEIC starts with bigger tiles and only cuts them smaller where the picture actually changes. A blue sky can stay one big piece. Eyelashes become many small ones."
	},
	{
		n: "2",
		title: "Guess from the neighbors",
		body: "For each tile, the encoder asks: “If I only knew the pixels next door, what would this look like?” JPEG barely does this. HEIC is very good at it — the same trick video uses so a wall does not have to be redrawn every frame."
	},
	{
		n: "3",
		title: "Keep only the surprise",
		body: "Subtract the guess from the real tile. What is left is the leftover — the surprise. A smooth sky has almost no leftover. A bicycle spoke has a lot."
	},
	{
		n: "4",
		title: "Throw away what you will not miss",
		body: "The leftover is turned into a pile of simple waves (a transform), then the tiniest waves are rounded off. That is the “lossy” part. Both JPEG and HEIC do it. HEIC is pickier about which leftovers actually matter to a human eye."
	},
	{
		n: "5",
		title: "Pack the leftovers tightly",
		body: "The numbers that remain get written with a clever alphabet. JPEG uses an older packing method. HEIC uses a denser one (people call it CABAC). Same idea as zip, tuned for pictures."
	}
];
var NAMES = [
	{
		name: "HEVC / H.265",
		body: "The actual compressor. Built for 4K video. A still HEIC is basically one “key frame” of that video format, saved as a photo."
	},
	{
		name: "HEIF",
		body: "The box around it. Can hold one picture, a burst, a Live Photo clip, depth, or a thumbnail."
	},
	{
		name: "HEIC",
		body: "Apple’s name when the picture inside the box is HEVC. That is the file on your iPhone."
	},
	{
		name: "Intra coding",
		body: "Compression that only looks inside this photo — not at the frame before. Stills have no “before,” so this is the whole game."
	},
	{
		name: "AVIF",
		body: "A cousin. Same kind of box, but the compressor is AV1 instead of HEVC. Often a bit smaller. Also picky about where it opens."
	}
];
function HeicAlgorithm() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "stagger-in max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "How it shrinks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
						children: "How HEIC compresses a photo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-pretty text-muted",
						children: "It is not a new kind of camera. It is a smarter way to throw away bytes your eye is unlikely to miss — the same family of ideas used to stream 4K video, pointed at a single still."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger-in mt-8",
				style: { animationDelay: "20ms" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnStrip, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockExplorer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-14",
				style: { animationDelay: "80ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "Five moves, in order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-pretty text-muted",
						children: "Every modern photo format does some version of this. HEIC does steps 1–3 much better than JPEG, which is why the file is smaller before anyone even talks about “quality.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 divide-y divide-border border-y border-border",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl text-subtle",
								children: step.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-fg",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-pretty text-muted",
								children: step.body
							})] })]
						}, step.n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-14",
				style: { animationDelay: "100ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "Why a video codec for photos?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4 text-pretty text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "By the 2010s, phones were already world-class at squeezing video. Photos had gotten huge — 12 megapixels, bursts, a little movie with every tap — and JPEG was still using 1992 math on a fixed grid." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "HEVC already knew how to spend bits only where the picture changes, and how to guess a block from its neighbors. Point that at one frame, drop it in a HEIF box, and you get a still that is often about half the JPEG with the same look. Apple turned that on for the iPhone camera in 2017." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The cost is patents and support. The compressor is not free for every company to ship, and a lot of websites never learned to open the file. That is the whole reason this converter exists." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-14",
				style: { animationDelay: "120ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "The names, decoded"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 divide-y divide-border border-y border-border",
					children: NAMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-fg",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-pretty text-muted",
							children: item.body
						})]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-14",
				style: { animationDelay: "140ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "What this page is not"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4 text-pretty text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The grid above is a sketch of the idea — big tiles on calm areas, small tiles on detail. A real HEVC encoder also tries dozens of guess directions, several transform sizes, and a rate machine that spends bits like a budget. We are not running that encoder in this tab." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Lumen ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic",
								children: "decodes"
							}),
							" the HEIC, then writes a JPEG, PNG, or WebP. The HEVC advantage stays in the original. That is why a typical export is",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/compression",
								className: "text-fg underline decoration-border underline-offset-4",
								children: "larger than the HEIC you started with"
							}),
							"."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Convert a HEIC"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/compression",
								children: "See the sizes"
							})
						})]
					})
				]
			})
		]
	});
}
function BlockExplorer() {
	const canvasRef = (0, import_react.useRef)(null);
	const sourceRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("heic");
	const [fuss, setFuss] = (0, import_react.useState)(40);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [counts, setCounts] = (0, import_react.useState)({
		jpeg: 0,
		heic: 0
	});
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch(SAMPLE_PATH);
				if (!res.ok) throw new Error("sample missing");
				const blob = await res.blob();
				const { heicTo } = await import("../_libs/heic-to.mjs").then((n) => n.t);
				const bitmap = await heicTo({
					blob,
					type: "bitmap"
				});
				if (cancelled) {
					bitmap.close();
					return;
				}
				const scale = Math.min(1, 720 / bitmap.width);
				const w = Math.round(bitmap.width * scale);
				const h = Math.round(bitmap.height * scale);
				const src = document.createElement("canvas");
				src.width = w;
				src.height = h;
				const ctx = src.getContext("2d");
				if (!ctx) throw new Error("no canvas");
				ctx.drawImage(bitmap, 0, 0, w, h);
				bitmap.close();
				sourceRef.current = src;
				setReady(true);
			} catch {
				if (!cancelled) setError("Could not load the sample photo.");
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const src = sourceRef.current;
		const canvas = canvasRef.current;
		if (!src || !canvas || !ready) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = src.width;
		canvas.height = src.height;
		ctx.drawImage(src, 0, 0);
		const pixels = ctx.getImageData(0, 0, src.width, src.height);
		const blocks = mode === "jpeg" ? gridBlocks(src.width, src.height, 32) : adaptiveBlocks(pixels.data, src.width, src.height, 8, 20 + (100 - fuss) * 4);
		ctx.strokeStyle = "rgba(250, 248, 243, 0.45)";
		ctx.lineWidth = 1;
		for (const b of blocks) ctx.strokeRect(b.x + .5, b.y + .5, b.w - 1, b.h - 1);
		setCounts((prev) => mode === "jpeg" ? {
			...prev,
			jpeg: blocks.length
		} : {
			...prev,
			heic: blocks.length
		});
	}, [
		mode,
		fuss,
		ready
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stagger-in mt-10",
		style: { animationDelay: "50ms" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight text-fg",
				children: "Same photo, two ways of cutting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-pretty text-muted",
				children: "JPEG paints a uniform grid. HEIC spends small tiles only where the leaves and branches change. This overlay is a sketch of that idea — not the real encoder."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[4/3] bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "size-full object-cover",
						"aria-label": "Photo with compression tiles drawn on top"
					}), !ready && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-fg" })
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex rounded-md bg-surface-2 p-1",
							role: "radiogroup",
							"aria-label": "Tile style",
							children: [["jpeg", "JPEG · even grid"], ["heic", "HEIC · adaptive"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "radio",
								"aria-checked": mode === id,
								onClick: () => setMode(id),
								className: cn("h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out", mode === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex items-center gap-4", mode === "jpeg" && "opacity-40"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "fuss",
								className: "shrink-0 text-xs font-medium tracking-wide text-subtle uppercase",
								children: "Detail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								id: "fuss",
								min: 0,
								max: 100,
								step: 1,
								disabled: mode === "jpeg",
								value: [fuss],
								onValueChange: (v) => setFuss(v[0] ?? 40),
								"aria-label": "How eagerly HEIC splits tiles"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-pretty text-subtle",
							children: mode === "jpeg" ? counts.jpeg ? `${counts.jpeg.toLocaleString()} even squares (drawn large so you can see them — real JPEG uses 8×8). Sky and branches cost the same.` : "Fixed grid." : counts.heic ? `${counts.heic.toLocaleString()} tiles. Drag Detail to spend more cuts on the trees.` : "Adaptive tiles."
						})
					]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-danger",
				children: error
			}) : null
		]
	});
}
function HowPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeicAlgorithm, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { HowPage as component };
