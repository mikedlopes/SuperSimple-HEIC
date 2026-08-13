# SuperSimple-HEIC

Browser HEIC / HEIF converter. Decode on the device, export JPEG, PNG, or WebP. Files are not uploaded.

## Use

Open the site, drop `.heic` / `.heif` files, choose a format, save. Batch export as a zip is available.

Safari and iOS use the platform decoder when they can. Other browsers use libheif (via [heic-to](https://github.com/hoppergee/heic-to)) in a worker.

## Requirements

- [Node.js](https://nodejs.org/) 22 or later
- npm (bundled with Node)

## Install

```bash
git clone https://github.com/mikedlopes/SuperSimple-HEIC.git
cd SuperSimple-HEIC
npm install
```

## Development

Start the local server (http://localhost:8080):

```bash
npm run dev
```

The app binds to `0.0.0.0:8080`. Vite hot-reloads on save.

## Production build

```bash
npm run build
```

This runs Vite + TanStack Start and emits a Vercel-ready Nitro output.

Preview the production build locally:

```bash
npm run preview
```

That also serves on http://localhost:8080.

## Checks

```bash
npm run typecheck
npm run lint
npm test
```

Format source:

```bash
npm run format
```

## Deploy

The production build uses Nitro’s `vercel` preset. Connect the GitHub repo to [Vercel](https://vercel.com) and use the default install/build commands:

| Step | Command |
| --- | --- |
| Install | `npm install` |
| Build | `npm run build` |

No environment variables are required for conversion. Do not set a database URL; the converter is client-only.

## Stack

React 19, TypeScript, Vite, TanStack Start, Tailwind CSS.

## License

MIT. HEVC / HEIF may be subject to third-party patents. This project does not grant a patent license.
