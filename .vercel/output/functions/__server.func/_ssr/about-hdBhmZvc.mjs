import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BCD9ooFK.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-hdBhmZvc.js
var import_jsx_runtime = require_jsx_runtime();
var TIMELINE = [
	{
		year: "1992",
		title: "JPEG takes over",
		body: "Every camera and website agrees on it. It still works — it was built for tiny photos."
	},
	{
		year: "2015",
		title: "A new box, a new compressor",
		body: "MPEG publishes HEIF. Nokia shares starter software. The picture inside is usually HEVC, the same family as 4K video."
	},
	{
		year: "2017",
		title: "iPhones switch on",
		body: "iOS 11 saves Camera roll as .heic. Live Photos and Portrait extras can live in the same file."
	},
	{
		year: "Today",
		title: "Phones yes, the web no",
		body: "Windows and Android mostly caught up. Email, printers, and most websites still want JPEG. That is why people convert."
	}
];
var RELATED = [
	{
		name: "HEIF",
		detail: "The official box. One photo, or several, plus extras."
	},
	{
		name: "HEIC",
		detail: "Apple’s name when the picture inside is HEVC. The file on your iPhone."
	},
	{
		name: "HEVC",
		detail: "The compressor. Great at shrinking. Not free for every company to ship."
	},
	{
		name: "JPEG",
		detail: "The older format everyone already opens. Email, websites, print shops."
	},
	{
		name: "AVIF",
		detail: "A cousin: same kind of box, a newer compressor, still picky in places."
	}
];
var PROS = [
	{
		title: "Smaller files",
		body: "Often about half a JPEG. More pictures fit on the phone and in iCloud."
	},
	{
		title: "One file, extras",
		body: "Live Photo motion or Portrait depth can ride along instead of a pile of leftovers."
	},
	{
		title: "Richer color",
		body: "Brighter highlights and more color than old JPEGs — the look people mean by HDR."
	}
];
var CONS = [
	{
		title: "Not every device",
		body: "Fine in iPhone Photos. A Windows PC or older Mac may not open it at all."
	},
	{
		title: "Websites reject it",
		body: "Most upload forms cannot read it. The picture becomes a broken icon."
	},
	{
		title: "Sharing is messy",
		body: "Slack, email, and the drugstore printer still want JPEG — and may drop the Live Photo."
	}
];
function AboutHeic() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "stagger-in max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "About the format"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
						children: "So what is a HEIC file?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-pretty text-muted",
						children: "If you took the photo on an iPhone, it is probably a HEIC. Smaller on disk, pickier about where it will open."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "stagger-in mt-10 grid gap-3 sm:grid-cols-3",
				style: { animationDelay: "40ms" },
				"aria-label": "Learn more",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/how",
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: "How"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium text-fg",
								children: "How HEIC shrinks a photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: "Adaptive tiles, guesses, leftovers."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/compression",
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium text-fg",
								children: "How much smaller is HEIC?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: "Live bars against JPEG, WebP, and PNG."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jpeg-artifacts",
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: "Artifacts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-medium text-fg",
								children: "Squares and sparkles"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: "What JPEG leftovers look like."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "60ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "Two names, one idea"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-pretty text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-medium text-fg",
							children: "HEIF"
						}),
						" is the box.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-medium text-fg",
							children: "HEIC"
						}),
						" is Apple’s name when the picture inside is compressed the modern way — files like",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-fg",
							children: "IMG_1234.HEIC"
						}),
						". Same family. Many computers still do not know what to do with it."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "80ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "How we got here"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-0",
					children: TIMELINE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[4.75rem_1fr] gap-4 border-t border-border py-5 sm:grid-cols-[6rem_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums text-subtle",
							children: item.year
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium text-fg",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-pretty text-muted",
							children: item.body
						})] })]
					}, item.year))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "100ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "The good and the annoying"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
							children: "Why it’s nice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-4",
							children: PROS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-fg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: item.body
							})] }, item.title))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
							children: "Why it’s a hassle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-4",
							children: CONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-fg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: item.body
							})] }, item.title))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "120ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-fg",
					children: "Names you might see"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-6 divide-y divide-border border-y border-border",
					children: RELATED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-sm text-fg",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-sm text-pretty text-muted",
							children: item.detail
						})]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in mt-12",
				style: { animationDelay: "140ms" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight text-fg",
						children: "Why convert it?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-pretty text-muted",
						children: "HEIC is a great way to keep photos on your phone. JPEG is how you send them into the rest of the world. This tool does that on your device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Convert your photos"
							})
						})
					})
				]
			})
		]
	});
}
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutHeic, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AboutPage as component };
