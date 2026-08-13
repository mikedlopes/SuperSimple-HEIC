import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-doc-BMbMAp6-.js
var import_jsx_runtime = require_jsx_runtime();
function LegalDoc({ kicker, title, updated, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "stagger-in max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Effective ",
						updated,
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stagger-in mt-10 space-y-10",
			style: { animationDelay: "60ms" },
			children
		})]
	});
}
function LegalSection({ id, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "scroll-mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-tight text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-3 text-pretty text-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:list-disc [&_ul]:pl-5",
			children
		})]
	});
}
//#endregion
export { LegalSection as n, LegalDoc as t };
