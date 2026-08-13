# SuperSimple-HEIC

Browser HEIC / HEIF converter. Decode on the device, export JPEG, PNG, or WebP. Files are not uploaded.

## Use

Open the site, drop `.heic` / `.heif` files, choose a format, save. Batch export as a zip is available.

Safari and iOS use the platform decoder when they can. Other browsers use libheif (via [heic-to](https://github.com/hoppergee/heic-to)) in a worker.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

Requires Node 22+.

## Stack

React 19, TypeScript, Vite, TanStack Start, Tailwind CSS.

## License

MIT. HEVC / HEIF may be subject to third-party patents. This project does not grant a patent license.
