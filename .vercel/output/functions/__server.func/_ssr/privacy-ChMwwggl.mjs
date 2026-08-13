import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
import { n as LegalSection, t as LegalDoc } from "./legal-doc-BMbMAp6-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-ChMwwggl.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalDoc, {
					kicker: "Legal",
					title: "Privacy Notice",
					updated: "13 August 2026",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSection, {
							id: "summary",
							title: "In short",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lumen is built so conversion happens on your device. We do not ask you to upload HEIC, HEIF, JPEG, PNG, or WebP files to our servers in order to convert them, and we do not operate a photo library of your pictures." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Hosting the website, stopping abuse, and optional sign-in can still involve ordinary technical data. This notice explains that. It is not a contract for legal advice. Use of Lumen is also governed by the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terms",
									children: "Terms of Use"
								}),
								"."
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSection, {
							id: "conversion",
							title: "Conversion stays on the device",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you drop or choose a photo, the file is read by scripts running in your browser. Decoding and export are designed to happen locally. Converted downloads are generated on your device. We do not receive those image bytes as part of the conversion pipeline, and we cannot retrieve a photo you converted." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you leave the page, close the tab, or clear site data, queued work and in-memory previews on that device are gone. We do not keep a server-side copy to restore them." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSection, {
							id: "technical",
							title: "Technical data we may process",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Any website produces some operational data. Depending on how you reach Lumen, our hosts, content networks, security tools, or platform provider may automatically process:" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "IP address, approximate location derived from it, and time;" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "browser type, device type, and language;" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "pages requested, referrers, and error logs;" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "basic abuse-prevention and uptime signals." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We use this to run, secure, and understand the Service — not to reconstruct your photos. Retention follows the logs of those providers, typically a short operational window unless a security or legal matter requires longer." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSection, {
							id: "accounts",
							title: "Optional sign-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "An account is not required to convert files. If you sign in, an identity provider may share a display name, email address, and avatar with us so we can show that you are signed in. That provider’s privacy policy applies to their authentication." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not use your account to store your photo library. Signing out does not delete files that already live on your own disk." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
							id: "cookies",
							title: "Cookies and local storage",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The site may use cookies or local storage for sign-in session, preferences, or basic function. You can block or clear them in your browser. Some features (especially sign-in) may stop working if you do." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
							id: "sharing",
							title: "Sharing",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not sell your photos. We do not have them from conversion. We may share technical or account data with vendors who host or secure the site, with professional advisors, or if required by law, legal process, or to protect the Service and other people. If the project is transferred, related operational data may transfer with it." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
							id: "children",
							title: "Children",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Service is not directed at children under 13 (or a higher age required where you live). We do not knowingly collect personal information from them. If you believe a child provided account data, contact the operator and we will delete it where required." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
							id: "rights",
							title: "Your choices",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can stop using the Service, decline sign-in, and clear browser data. For account information held by an identity provider, use that provider’s tools. Where data-protection law gives you access, correction, deletion, or objection rights for personal data we actually hold, we will honor those requests as required." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
							id: "changes",
							title: "Changes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We may update this notice. The effective date will change. Continued use after an update means you have read the revised notice." })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PrivacyPage as component };
