import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-BCD9ooFK.mjs";
import { l as ChevronsLeftRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/side-by-side-DPQsrBU0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SideBySide({ leftSrc, rightSrc, leftLabel, rightLabel, leftAlt, rightAlt, zoom = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("overflow-hidden rounded-xl bg-surface-2 shadow-[var(--shadow-border)]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "relative min-w-0 border-r border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: leftSrc,
					alt: leftAlt,
					className: cn("aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10", zoom && "origin-center scale-150")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg",
					children: leftLabel
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "relative min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: rightSrc,
					alt: rightAlt,
					className: cn("aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10", zoom && "origin-center scale-150")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "absolute right-2 bottom-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg",
					children: rightLabel
				})]
			})]
		})
	});
}
function WipeCompare({ leftSrc, rightSrc, leftLabel, rightLabel, leftAlt, rightAlt, zoom = false }) {
	const [pct, setPct] = (0, import_react.useState)(50);
	const trackRef = (0, import_react.useRef)(null);
	const dragging = (0, import_react.useRef)(false);
	const labelId = (0, import_react.useId)();
	const setFromClientX = (0, import_react.useCallback)((clientX) => {
		const el = trackRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const next = (clientX - rect.left) / rect.width * 100;
		setPct(Math.min(96, Math.max(4, next)));
	}, []);
	function onPointerDown(event) {
		dragging.current = true;
		event.currentTarget.setPointerCapture(event.pointerId);
		setFromClientX(event.clientX);
	}
	function onPointerMove(event) {
		if (!dragging.current) return;
		setFromClientX(event.clientX);
	}
	function onPointerUp(event) {
		dragging.current = false;
		event.currentTarget.releasePointerCapture(event.pointerId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl bg-surface-2 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: trackRef,
				className: "relative aspect-[4/3] cursor-ew-resize touch-none select-none",
				onPointerDown,
				onPointerMove,
				onPointerUp,
				onPointerCancel: onPointerUp,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: rightSrc,
						alt: rightAlt,
						className: cn("absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10", zoom && "origin-center scale-150")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: leftSrc,
						alt: leftAlt,
						className: cn("absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10", zoom && "origin-center scale-150"),
						style: { clipPath: `inset(0 ${100 - pct}% 0 0)` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 z-10 w-px bg-accent",
						style: { left: `${pct}%` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeftRight, {
								className: "size-4",
								strokeWidth: 1.75
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg",
						children: leftLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none absolute right-2 bottom-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg",
						children: rightLabel
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: labelId,
				children: "Drag to compare images"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: labelId,
				type: "range",
				min: 4,
				max: 96,
				value: Math.round(pct),
				onChange: (e) => setPct(Number(e.target.value)),
				className: "sr-only"
			})
		]
	});
}
//#endregion
export { WipeCompare as n, SideBySide as t };
