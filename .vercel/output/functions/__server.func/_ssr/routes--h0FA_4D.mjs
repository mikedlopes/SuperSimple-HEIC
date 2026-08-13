import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BCD9ooFK.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-CwlBrXKq.mjs";
import { a as LoaderCircle, c as CircleAlert, i as Plus, o as Image, r as Trash2, s as Download, t as X } from "../_libs/lucide-react.mjs";
import { t as Slider } from "./slider-S2jl3B4-.mjs";
import { d as zipConverted, i as downloadBlob, l as outputName, n as FORMAT_META, o as explainConvertError, r as convertHeic, s as formatBytes, t as ACCEPTED_LABEL, u as validateHeicFile } from "./convert-r4oaTcFg.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--h0FA_4D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FORMATS = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
var ACCEPT = ".heic,.heif,image/heic,image/heif,image/heic-sequence";
var SAMPLE_PATH = "/samples/autumn.heic";
function newId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function Converter() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [format, setFormat] = (0, import_react.useState)("image/jpeg");
	const [quality, setQuality] = (0, import_react.useState)(.85);
	const [keepMeta, setKeepMeta] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [zipping, setZipping] = (0, import_react.useState)(false);
	const [loadingSample, setLoadingSample] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const itemsRef = (0, import_react.useRef)(items);
	const processingRef = (0, import_react.useRef)(false);
	const settingsRef = (0, import_react.useRef)({
		format,
		quality,
		keepMeta
	});
	const addFilesRef = (0, import_react.useRef)(async () => {});
	itemsRef.current = items;
	settingsRef.current = {
		format,
		quality,
		keepMeta
	};
	const processQueue = (0, import_react.useCallback)(async () => {
		if (processingRef.current) return;
		processingRef.current = true;
		try {
			while (true) {
				const next = itemsRef.current.find((i) => i.status === "queued");
				if (!next) break;
				const { format: fmt, quality: q, keepMeta: keep } = settingsRef.current;
				setItems((prev) => prev.map((i) => i.id === next.id ? {
					...i,
					status: "converting",
					error: void 0
				} : i));
				try {
					const result = await convertHeic(next.file, fmt, q, { keepMetadata: keep });
					const previewUrl = URL.createObjectURL(result.blob);
					setItems((prev) => prev.map((i) => {
						if (i.id !== next.id) return i;
						if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
						return {
							...i,
							status: "done",
							output: result.blob,
							previewUrl,
							outputSize: result.blob.size,
							width: result.width,
							height: result.height,
							kept: keep ? result.kept ?? [] : void 0
						};
					}));
				} catch (err) {
					const message = explainConvertError(err, next.kind);
					setItems((prev) => prev.map((i) => i.id === next.id ? {
						...i,
						status: "error",
						error: message
					} : i));
				}
			}
		} finally {
			processingRef.current = false;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (items.some((i) => i.status === "queued")) processQueue();
	}, [items, processQueue]);
	const addFiles = (0, import_react.useCallback)(async (fileList) => {
		const incoming = Array.from(fileList);
		if (incoming.length === 0) return;
		const accepted = [];
		const rejected = [];
		for (const file of incoming) {
			const check = await validateHeicFile(file);
			const item = {
				id: newId(),
				file,
				name: file.name || "untitled",
				originalSize: file.size,
				status: check.ok ? "queued" : "rejected",
				error: check.ok ? void 0 : check.reason,
				note: check.ok ? check.note : void 0,
				kind: check.ok ? check.kind : void 0
			};
			if (check.ok) accepted.push(item);
			else rejected.push(item);
		}
		if (rejected.length > 0) toast(rejected.length === 1 ? `${rejected[0].name} — ${rejected[0].error}` : `${rejected.length} files are not ${ACCEPTED_LABEL}`);
		if (accepted.length === 0 && rejected.length === 0) return;
		setItems((prev) => [
			...prev,
			...accepted,
			...rejected
		]);
	}, []);
	addFilesRef.current = addFiles;
	(0, import_react.useEffect)(() => {
		function isFileDrag(event) {
			const types = event.dataTransfer?.types;
			if (!types) return false;
			return Array.from(types).includes("Files");
		}
		function onDragEnter(event) {
			if (!isFileDrag(event)) return;
			event.preventDefault();
			setDragging(true);
		}
		function onDragOver(event) {
			if (!isFileDrag(event)) return;
			event.preventDefault();
			if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
			setDragging(true);
		}
		function onDragLeave(event) {
			if (!isFileDrag(event)) return;
			event.preventDefault();
			const x = event.clientX;
			const y = event.clientY;
			if (event.relatedTarget == null || x <= 0 || y <= 0 || x >= window.innerWidth || y >= window.innerHeight) setDragging(false);
		}
		function onDrop(event) {
			event.preventDefault();
			setDragging(false);
			const files = event.dataTransfer?.files;
			if (files && files.length > 0) addFilesRef.current(files);
		}
		window.addEventListener("dragenter", onDragEnter);
		window.addEventListener("dragover", onDragOver);
		window.addEventListener("dragleave", onDragLeave);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragenter", onDragEnter);
			window.removeEventListener("dragover", onDragOver);
			window.removeEventListener("dragleave", onDragLeave);
			window.removeEventListener("drop", onDrop);
		};
	}, []);
	const reconvertAll = (0, import_react.useCallback)(() => {
		setItems((prev) => prev.map((i) => {
			if (i.status === "rejected") return i;
			if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
			return {
				...i,
				status: "queued",
				error: void 0,
				output: void 0,
				previewUrl: void 0,
				outputSize: void 0
			};
		}));
	}, []);
	const settingsReady = items.some((i) => i.status !== "rejected");
	const skipFirstSettings = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		if (!settingsReady) {
			skipFirstSettings.current = true;
			return;
		}
		if (skipFirstSettings.current) {
			skipFirstSettings.current = false;
			return;
		}
		const handle = window.setTimeout(() => reconvertAll(), 280);
		return () => window.clearTimeout(handle);
	}, [
		format,
		quality,
		keepMeta,
		reconvertAll,
		settingsReady
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			for (const item of itemsRef.current) if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
		};
	}, []);
	const usable = (0, import_react.useMemo)(() => items.filter((i) => i.status !== "rejected"), [items]);
	const rejectedCount = items.length - usable.length;
	const done = (0, import_react.useMemo)(() => usable.filter((i) => i.status === "done" && i.output), [usable]);
	const busy = usable.some((i) => i.status === "queued" || i.status === "converting");
	const saved = (0, import_react.useMemo)(() => {
		return done.reduce((acc, i) => {
			if (!i.outputSize) return acc;
			return acc + (i.originalSize - i.outputSize);
		}, 0);
	}, [done]);
	function removeItem(id) {
		setItems((prev) => {
			const target = prev.find((i) => i.id === id);
			if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
			return prev.filter((i) => i.id !== id);
		});
	}
	function clearAll() {
		setItems((prev) => {
			for (const i of prev) if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
			return [];
		});
	}
	async function downloadAll() {
		if (done.length === 0) return;
		if (done.length === 1 && done[0].output) {
			downloadBlob(done[0].output, outputName(done[0].name, format));
			return;
		}
		setZipping(true);
		try {
			const blob = await zipConverted(done.filter((i) => Boolean(i.output)).map((i) => ({
				name: outputName(i.name, format),
				blob: i.output
			})));
			downloadBlob(blob, `lumen-${FORMAT_META[format].ext}.zip`);
		} catch {
			toast("Could not build the zip. Try downloading files one at a time.");
		} finally {
			setZipping(false);
		}
	}
	async function loadSample() {
		setLoadingSample(true);
		try {
			const res = await fetch(SAMPLE_PATH);
			if (!res.ok) throw new Error("sample missing");
			const blob = await res.blob();
			const file = new File([blob], "autumn.heic", { type: "image/heic" });
			await addFiles([file]);
		} catch {
			toast("Could not load the sample photo.");
		} finally {
			setLoadingSample(false);
		}
	}
	const inputId = (0, import_react.useId)();
	const empty = items.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-28 pt-6 sm:px-8 sm:pb-16 sm:pt-10",
		children: [
			dragging ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-3 z-50 flex items-center justify-center rounded-2xl bg-bg/75 outline outline-1 outline-dashed outline-accent/50",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-tight text-fg sm:text-3xl",
					children: "Release to add HEIC files"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stagger-in max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "Local converter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl",
						children: "iPhone photos, unlocked."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-base text-pretty text-muted",
						children: "Drag HEIC photos onto this page to convert them to JPEG, PNG, or WebP. Decoding happens here in the browser — nothing is uploaded."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in",
				style: { animationDelay: "80ms" },
				"data-drop-zone": "true",
				children: [
					empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex min-h-64 flex-col items-center justify-center rounded-2xl bg-surface px-6 py-10 text-center shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-200 ease-out sm:min-h-80 sm:px-10 sm:py-12", dragging && "bg-surface-2 shadow-[var(--shadow-border-hover)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => inputRef.current?.click(),
							className: "flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-12 place-items-center rounded-lg bg-surface-2 text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
										className: "size-5",
										strokeWidth: 1.6
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-5 font-display text-2xl tracking-tight text-fg",
									children: dragging ? "Release to add photos" : "Drop HEIC files here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 max-w-sm text-sm text-pretty text-muted",
									children: dragging ? "Drop anywhere on the page to start converting." : "Several at once is fine. JPEG and PNG are skipped. Then pick a format and save."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-6 flex flex-wrap items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: () => inputRef.current?.click(),
								children: "Choose files"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								disabled: loadingSample,
								onClick: () => void loadSample(),
								children: [loadingSample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Try a sample"]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						className: cn("flex min-h-14 w-full flex-col items-center justify-center gap-0.5 rounded-xl bg-surface px-4 py-3 text-sm shadow-[var(--shadow-border)] transition-[box-shadow,background-color,color] duration-200 ease-out hover:bg-surface-2 sm:flex-row sm:gap-2", dragging && "bg-surface-2 shadow-[var(--shadow-border-hover)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								className: "size-4",
								strokeWidth: 1.75
							}), dragging ? "Release to add photos" : "Drop more HEIC files here"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: dragging ? "" : "or click to browse"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						id: inputId,
						type: "file",
						accept: ACCEPT,
						multiple: true,
						className: "sr-only",
						tabIndex: -1,
						onChange: (e) => {
							if (e.target.files) addFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-xs text-pretty text-subtle",
						children: [
							"As-is. Keep your originals.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "text-muted transition-[color] duration-150 hover:text-fg",
								children: "Terms"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {
				format,
				quality,
				keepMeta,
				onFormat: setFormat,
				onQuality: setQuality,
				onKeepMeta: setKeepMeta
			}),
			items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl tracking-tight text-fg",
						children: [
							usable.length,
							" ",
							usable.length === 1 ? "photo" : "photos",
							rejectedCount > 0 ? ` · ${rejectedCount} skipped` : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted tabular-nums",
						children: [
							busy ? `Converting ${usable.filter((i) => i.status === "done" || i.status === "error").length + 1} of ${usable.length}` : `${done.length} ready`,
							saved > 0 ? ` · ${formatBytes(saved)} smaller` : null,
							saved < 0 ? ` · ${formatBytes(-saved)} larger` : null
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: clearAll,
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Clear"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "hidden sm:inline-flex",
							onClick: () => void downloadAll(),
							disabled: done.length === 0 || zipping,
							children: [zipping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), done.length > 1 ? "Download all" : "Download"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCard, {
						item,
						format,
						keepMeta,
						index,
						onRemove: () => removeItem(item.id)
					}, item.id))
				})]
			}) : null,
			items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/90 px-4 py-3 backdrop-blur-sm sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					onClick: () => void downloadAll(),
					disabled: done.length === 0 || zipping,
					children: [zipping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), done.length > 1 ? `Download ${done.length} files` : done.length === 1 ? "Download" : "Converting…"]
				})
			}) : null
		]
	});
}
function Controls({ format, quality, keepMeta, onFormat, onQuality, onKeepMeta }) {
	const showQuality = FORMAT_META[format].quality;
	const qualityLabel = format === "image/jpeg" ? "JPEG quality" : format === "image/webp" ? "WebP quality" : "Quality";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in flex flex-col gap-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		style: { animationDelay: "140ms" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex rounded-md bg-surface-2 p-1",
				role: "radiogroup",
				"aria-label": "Output format",
				children: FORMATS.map((f) => {
					const active = format === f;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "radio",
						"aria-checked": active,
						onClick: () => onFormat(f),
						className: cn("h-10 min-w-16 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out", active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: FORMAT_META[f].label
					}, f);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex min-w-0 flex-1 items-center gap-4 sm:max-w-sm sm:justify-end", !showQuality && "opacity-40"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "shrink-0 text-xs font-medium tracking-wide text-subtle uppercase",
						htmlFor: "quality",
						children: qualityLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						id: "quality",
						min: 40,
						max: 100,
						step: 1,
						disabled: !showQuality,
						value: [Math.round(quality * 100)],
						onValueChange: (v) => onQuality((v[0] ?? 90) / 100),
						"aria-label": "Output quality"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 shrink-0 text-right font-mono text-sm tabular-nums text-fg",
						children: Math.round(quality * 100)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-md bg-surface-2 p-1",
				role: "radiogroup",
				"aria-label": "Metadata",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": !keepMeta,
					onClick: () => onKeepMeta(false),
					className: cn("h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out sm:flex-none", !keepMeta ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
					children: "Strip tags"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": keepMeta,
					onClick: () => onKeepMeta(true),
					className: cn("h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out sm:flex-none", keepMeta ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
					children: "Keep what we can"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-pretty text-subtle sm:max-w-sm sm:text-right",
				children: keepMeta ? format === "image/jpeg" ? "Copies date, camera, and GPS into the JPEG when those tags can be read. Orientation is always applied. Live Photo motion is never kept." : "Keep only works on JPEG. PNG and WebP are re-encoded without camera tags." : "The export is a new file. Date, GPS, and camera tags are left out. The picture is rotated the right way up."
			})]
		})]
	});
}
function FileCard({ item, format, keepMeta, index, onRemove }) {
	const name = outputName(item.name, format);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "stagger-in group relative flex flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
		style: { animationDelay: `${Math.min(index, 8) * 40}ms` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] bg-surface-2",
			children: [
				item.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.previewUrl,
					alt: item.name,
					className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("size-full grid place-items-center", item.status === "error" || item.status === "rejected" ? "bg-danger/10" : "skeleton-shimmer"),
					children: item.status === "rejected" || item.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						className: "size-6 text-danger",
						strokeWidth: 1.6
					}) : null
				}),
				item.status === "converting" || item.status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center bg-bg/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-5 animate-spin text-fg",
						strokeWidth: 1.75
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onRemove,
					"aria-label": `Remove ${item.name}`,
					className: "absolute top-2 right-2 grid size-8 place-items-center rounded-sm bg-bg/70 text-fg opacity-100 transition-[opacity,background-color] duration-150 hover:bg-bg sm:opacity-0 sm:group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-fg",
					title: item.name,
					children: item.status === "done" ? name : item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-xs", item.status === "rejected" || item.status === "error" ? "text-pretty text-danger" : "font-mono tabular-nums text-subtle"),
					children: item.status === "done" && item.outputSize != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						formatBytes(item.originalSize),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: " → "
						}),
						formatBytes(item.outputSize)
					] }) : item.status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.error ?? "Not HEIC" }) : item.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.error ?? "Could not convert" }) : item.status === "converting" ? "Converting…" : "Waiting…"
				}),
				item.status === "done" && item.outputSize != null && item.outputSize > item.originalSize && format === "image/jpeg" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-subtle",
					children: [
						"Larger —",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/compression",
							className: "text-muted underline decoration-border underline-offset-4 hover:text-fg",
							children: "why"
						})
					]
				}) : null,
				item.note && item.status !== "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-pretty text-muted",
					children: item.note
				}) : null,
				item.status === "done" && keepMeta && format === "image/jpeg" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: item.kept && item.kept.length > 0 ? `Kept ${item.kept.join(", ")}` : "No date, camera, or GPS on this file"
				}) : null,
				item.status === "done" && item.output ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "mt-auto w-full",
					onClick: () => downloadBlob(item.output, name),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Save"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-auto h-9" })
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Converter, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { note: "Decodes locally with libheif." })
		]
	});
}
//#endregion
export { Home as component };
