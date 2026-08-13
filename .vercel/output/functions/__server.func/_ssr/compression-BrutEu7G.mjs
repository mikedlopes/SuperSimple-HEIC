import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BCD9ooFK.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
import { a as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as SideBySide } from "./side-by-side-DPQsrBU0.mjs";
import { t as LearnStrip } from "./learn-strip-BbfiUuRO.mjs";
import { t as Slider } from "./slider-S2jl3B4-.mjs";
import { c as measureAgainstHeic, s as formatBytes, u as validateHeicFile } from "./convert-r4oaTcFg.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compression-BrutEu7G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE_PATH = "/samples/autumn.heic";
var QUALITY_NOTES = {
	60: {
		title: "Small and rough",
		body: "Fine for a tiny chat bubble. Skies turn blotchy and edges get a grid if you look closely."
	},
	75: {
		title: "Everyday send",
		body: "Looks fine on a phone. Zoom in and foliage or skin starts to soften."
	},
	85: {
		title: "The usual export",
		body: "What most people mean by “a good JPEG.” Still larger than the original HEIC."
	},
	95: {
		title: "Mostly wasted bytes",
		body: "Hard to tell from 85 unless you pixel-peep. The file jumps a lot for almost no extra look."
	}
};
function CompressionExplore() {
	const [quality, setQuality] = (0, import_react.useState)(.85);
	const [compare, setCompare] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const previewRef = (0, import_react.useRef)(null);
	const stepUrlsRef = (0, import_react.useRef)([]);
	const qualityRef = (0, import_react.useRef)(quality);
	const runId = (0, import_react.useRef)(0);
	const skipQualityEffect = (0, import_react.useRef)(true);
	qualityRef.current = quality;
	function revokePreviews() {
		if (previewRef.current) URL.revokeObjectURL(previewRef.current);
		previewRef.current = null;
		for (const url of stepUrlsRef.current) URL.revokeObjectURL(url);
		stepUrlsRef.current = [];
	}
	const run = (0, import_react.useCallback)(async (file, q) => {
		const id = ++runId.current;
		setBusy(true);
		setError(null);
		try {
			const result = await measureAgainstHeic(file, q);
			if (id !== runId.current) return;
			revokePreviews();
			const previewUrl = URL.createObjectURL(result.jpeg);
			previewRef.current = previewUrl;
			const jpegSteps = result.jpegSteps.map((step) => {
				const url = URL.createObjectURL(step.blob);
				stepUrlsRef.current.push(url);
				return {
					quality: step.quality,
					bytes: step.blob.size,
					url
				};
			});
			setCompare({
				name: file.name,
				heicBytes: result.heicBytes,
				jpegBytes: result.jpeg.size,
				webpBytes: result.webp.size,
				pngBytes: result.png.size,
				width: result.width,
				height: result.height,
				previewUrl,
				jpegSteps,
				webpAt85: result.webpAt85
			});
		} catch {
			if (id !== runId.current) return;
			setError("Could not read this HEIC file.");
		} finally {
			if (id === runId.current) setBusy(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch(SAMPLE_PATH);
				if (!res.ok) throw new Error("missing sample");
				const blob = await res.blob();
				const file = new File([blob], "autumn.heic", { type: "image/heic" });
				if (cancelled) return;
				fileRef.current = file;
				await run(file, qualityRef.current);
			} catch {
				if (!cancelled) {
					setBusy(false);
					setError("Could not load the sample photo.");
				}
			}
		})();
		return () => {
			cancelled = true;
			revokePreviews();
		};
	}, [run]);
	(0, import_react.useEffect)(() => {
		if (skipQualityEffect.current) {
			skipQualityEffect.current = false;
			return;
		}
		if (!fileRef.current) return;
		const handle = window.setTimeout(() => {
			if (fileRef.current) run(fileRef.current, quality);
		}, 280);
		return () => window.clearTimeout(handle);
	}, [quality, run]);
	async function onPick(list) {
		if (!list?.[0]) return;
		const file = list[0];
		const check = await validateHeicFile(file);
		if (!check.ok) {
			toast(check.reason);
			return;
		}
		fileRef.current = file;
		await run(file, quality);
	}
	const max = compare ? Math.max(compare.heicBytes, compare.jpegBytes, compare.webpBytes, compare.pngBytes) : 1;
	const jpegRatio = compare ? compare.jpegBytes / compare.heicBytes : 1;
	const savedPct = compare && compare.jpegBytes > compare.heicBytes ? Math.round((1 - compare.heicBytes / compare.jpegBytes) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-8 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "stagger-in max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "Compression"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
						children: "How much smaller is HEIC, really?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-pretty text-muted",
						children: "HEIC’s main trick is packing a photo into fewer megabytes without looking obviously worse. Use the sample, or drop your own HEIC, and compare it to JPEG, WebP, and PNG."
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
				style: { animationDelay: "70ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2 sm:w-56 sm:shrink-0",
							children: [compare?.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: compare.previewUrl,
								alt: compare.name,
								className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-full skeleton-shimmer" }), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center bg-bg/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-fg" })
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: compare ? `${compare.name} · ${compare.width}×${compare.height}` : "Loading a sample photo…"
								}),
								compare && savedPct > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-display text-2xl tracking-tight text-fg",
									children: [
										"This HEIC is ",
										savedPct,
										"% smaller than a JPEG at quality",
										" ",
										Math.round(quality * 100),
										"."
									]
								}) : compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl tracking-tight text-fg",
									children: "At this low quality, JPEG can be smaller — it will also look worse."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl tracking-tight text-fg",
									children: "Measuring file sizes…"
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-danger",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => inputRef.current?.click(),
										children: "Try your HEIC"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: inputRef,
										type: "file",
										accept: ".heic,.heif,image/heic,image/heif",
										className: "sr-only",
										tabIndex: -1,
										onChange: (e) => {
											onPick(e.target.files);
											e.target.value = "";
										}
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "shrink-0 text-xs font-medium tracking-wide text-subtle uppercase",
								htmlFor: "compare-quality",
								children: "JPEG / WebP quality"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								id: "compare-quality",
								min: 40,
								max: 100,
								step: 1,
								value: [Math.round(quality * 100)],
								onValueChange: (v) => setQuality((v[0] ?? 85) / 100),
								"aria-label": "Comparison quality"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 shrink-0 text-right font-mono text-sm tabular-nums text-fg",
								children: Math.round(quality * 100)
							})
						]
					}),
					compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
								label: "HEIC",
								hint: "Original",
								bytes: compare.heicBytes,
								max,
								accent: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
								label: "JPEG",
								hint: `${jpegRatio.toFixed(1)}× the HEIC`,
								bytes: compare.jpegBytes,
								max
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
								label: "WebP",
								hint: "Another modern option",
								bytes: compare.webpBytes,
								max
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
								label: "PNG",
								hint: "Keeps every pixel",
								bytes: compare.pngBytes,
								max
							})
						]
					}) : null
				]
			}),
			compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "85ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "What JPEG quality actually changes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-pretty text-muted",
						children: "Same HEIC, saved as four JPEGs. The pair below is quality 60 next to 95, zoomed into the same spot. Tap a tile to set that quality above."
					}),
					compare.jpegSteps[0] && compare.jpegSteps[3] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideBySide, {
							leftSrc: compare.jpegSteps[0].url,
							rightSrc: compare.jpegSteps[3].url,
							leftLabel: `JPEG 60 · ${formatBytes(compare.jpegSteps[0].bytes)}`,
							rightLabel: `JPEG 95 · ${formatBytes(compare.jpegSteps[3].bytes)}`,
							leftAlt: "JPEG quality 60",
							rightAlt: "JPEG quality 95",
							zoom: true
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JpegQualityGrid, {
						steps: compare.jpegSteps,
						heicBytes: compare.heicBytes,
						active: Math.round(quality * 100),
						onPick: (q) => setQuality(q)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-pretty text-muted",
						children: [
							"Cranking quality to 95 or 100 does not restore detail the HEIC already threw away. It only makes a puffier JPEG.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/jpeg-artifacts",
								className: "text-fg underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg",
								children: "Why JPEGs get squares and sparkles"
							})
						]
					})
				]
			}) : null,
			compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-10",
				style: { animationDelay: "90ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "Exact sizes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-pretty text-muted",
						children: "Same photo, rewritten in this browser. HEIC is the original file. JPEG rows are the usual “how does this look as a regular photo?” check."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeTable, { compare })
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stagger-in mt-10 text-sm text-pretty text-muted",
				children: "Converting a HEIC to JPEG often makes the file bigger. You unpack a tight suitcase so more apps can open it. Keep the HEIC as the original."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Convert a HEIC"
					})
				})
			})
		]
	});
}
function SizeRow({ label, hint, bytes, max, accent = false }) {
	const pct = Math.max(6, Math.round(bytes / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-fg",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-subtle",
				children: hint
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-sm tabular-nums text-fg",
			children: formatBytes(bytes)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-full bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-300 ease-out", accent ? "bg-accent" : "bg-muted/50"),
			style: { width: `${pct}%` }
		})
	})] });
}
function vsHeic(bytes, heic) {
	if (bytes === heic) return "Baseline";
	const delta = bytes - heic;
	const abs = formatBytes(Math.abs(delta));
	if (bytes > heic) return `${(bytes / heic).toFixed(1)}× · +${abs}`;
	return `${Math.round((1 - bytes / heic) * 100)}% smaller · −${abs}`;
}
function SizeTable({ compare }) {
	const rows = [
		{
			format: "HEIC",
			setting: "Original",
			bytes: compare.heicBytes,
			baseline: true
		},
		...compare.jpegSteps.map((step) => ({
			format: "JPEG",
			setting: `Quality ${Math.round(step.quality * 100)}`,
			bytes: step.bytes
		})),
		{
			format: "WebP",
			setting: "Quality 85",
			bytes: compare.webpAt85
		},
		{
			format: "PNG",
			setting: "Lossless",
			bytes: compare.pngBytes
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[32rem] border-collapse text-left text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "File size comparison of HEIC against JPEG, WebP, and PNG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs font-medium tracking-wide text-subtle uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-4 py-3 font-medium sm:px-5",
							children: "Format"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-4 py-3 font-medium sm:px-5",
							children: "Setting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-4 py-3 text-right font-medium sm:px-5",
							children: "Size"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-4 py-3 text-right font-medium sm:px-5",
							children: "vs HEIC"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: cn("border-b border-border last:border-b-0", row.baseline && "bg-surface-2"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "row",
							className: "px-4 py-3 font-medium text-fg sm:px-5",
							children: row.format
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted sm:px-5",
							children: row.setting
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right font-mono tabular-nums text-fg sm:px-5",
							children: formatBytes(row.bytes)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right font-mono text-xs tabular-nums text-muted sm:px-5",
							children: vsHeic(row.bytes, compare.heicBytes)
						})
					]
				}, `${row.format}-${row.setting}`)) })
			]
		})
	});
}
function JpegQualityGrid({ steps, heicBytes, active, onPick }) {
	const maxBytes = Math.max(heicBytes, ...steps.map((s) => s.bytes));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: steps.map((step) => {
					const q = Math.round(step.quality * 100);
					const note = QUALITY_NOTES[q];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(step.quality),
						className: cn("flex w-full flex-col overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out", active === q && "shadow-[var(--shadow-border-hover)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/3] overflow-hidden bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: step.url,
								alt: `JPEG quality ${q}`,
								className: "size-full origin-center scale-150 object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium text-fg",
									children: ["JPEG ", q]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs tabular-nums text-subtle",
									children: [formatBytes(step.bytes), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-subtle",
										children: [
											" ",
											"· ",
											vsHeic(step.bytes, heicBytes)
										]
									})]
								}),
								note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 hidden text-xs text-pretty text-muted sm:block",
									children: note.title
								}) : null
							]
						})]
					}) }, step.quality);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "HEIC original"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tabular-nums text-muted",
						children: formatBytes(heicBytes)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-accent",
						style: { width: `${Math.max(6, Math.round(heicBytes / maxBytes * 100))}%` }
					})
				})] }), steps.map((step) => {
					const q = Math.round(step.quality * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1.5 flex justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: ["JPEG ", q]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums text-muted",
							children: formatBytes(step.bytes)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-muted/50",
							style: { width: `${Math.max(6, Math.round(step.bytes / maxBytes * 100))}%` }
						})
					})] }, `bar-${step.quality}`);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-6 divide-y divide-border border-y border-border",
				children: steps.map((step) => {
					const q = Math.round(step.quality * 100);
					const note = QUALITY_NOTES[q];
					if (!note) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-sm text-fg",
							children: q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "text-sm text-pretty text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-fg",
								children: [note.title, ". "]
							}), note.body]
						})]
					}, `note-${step.quality}`);
				})
			})
		]
	});
}
function CompressionPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompressionExplore, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { note: "Sizes are measured in your browser from the same photo." })
		]
	});
}
//#endregion
export { CompressionPage as component };
