import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-BCD9ooFK.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-strip-BbfiUuRO.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/how",
		label: "How"
	},
	{
		to: "/compression",
		label: "Size"
	},
	{
		to: "/jpeg-artifacts",
		label: "Artifacts"
	}
];
function LearnStrip() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-wrap gap-x-4 gap-y-1 text-sm",
		"aria-label": "Learn pages",
		children: ITEMS.map((item) => {
			const active = pathname === item.to;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				className: cn("transition-[color] duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
				"aria-current": active ? "page" : void 0,
				children: item.label
			}, item.to);
		})
	});
}
//#endregion
export { LearnStrip as t };
