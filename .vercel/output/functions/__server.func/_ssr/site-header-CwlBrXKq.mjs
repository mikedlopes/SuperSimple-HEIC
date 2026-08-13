import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-CwlBrXKq.js
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter({ note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "px-5 pb-10 pt-6 sm:px-8",
		children: [note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto max-w-3xl text-center text-xs text-pretty text-subtle",
			children: note
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto mt-3 max-w-3xl text-center text-xs text-pretty text-subtle",
			children: [
				"By using Lumen you agree to the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/terms",
					className: "text-muted transition-[color] duration-150 hover:text-fg",
					children: "Terms"
				}),
				" ",
				"and",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "text-muted transition-[color] duration-150 hover:text-fg",
					children: "Privacy"
				}),
				". As-is — keep your originals."
			]
		})]
	});
}
var LEARN = /* @__PURE__ */ new Set([
	"/about",
	"/compression",
	"/jpeg-artifacts",
	"/how"
]);
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const learnActive = LEARN.has(pathname);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center justify-between gap-4 px-5 py-4 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "font-display text-xl tracking-tight text-fg transition-[opacity] duration-150 hover:opacity-80",
				children: "Lumen"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Files stay on this device"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center gap-4 text-sm sm:gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				activeOptions: { exact: true },
				className: "text-muted transition-[color] duration-150 hover:text-fg",
				activeProps: { className: "text-fg" },
				children: "Convert"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/about",
				className: learnActive ? "text-fg" : "text-muted transition-[color] duration-150 hover:text-fg",
				children: "Learn"
			})]
		})]
	});
}
//#endregion
export { SiteHeader as n, SiteFooter as t };
