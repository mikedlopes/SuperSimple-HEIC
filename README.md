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

## Docker

The image is a multi-stage Node 22 Alpine build. Conversion still happens in the browser; the container only serves the app. The runtime stage keeps the Node binary and `.output` — npm and unused font subsets are stripped.

### Build the image

```bash
docker build -t supersimple-heic .
```

This runs `NITRO_PRESET=node-server npm run build` so the output is a Node server (not the Vercel bundle).

Without Docker, the same production server build is:

```bash
npm install
npm run build:docker
node .output/server/index.mjs
```

### Run the container

```bash
docker run --rm -p 8080:8080 supersimple-heic
```

Open http://localhost:8080.

### Docker Compose

```bash
docker compose up --build
```

Serves on http://localhost:8080. Stop with `Ctrl+C`, or `docker compose down`.

### Notes

- Image is `node:22-alpine` with npm/corepack removed. Runs as a non-root `app` user.
- After the Vite/Nitro build, `scripts/slim-output.mjs` drops the unused server-side `heic-to` copy, Grok PWA assets, `.woff` (woff2 remains), and non-Latin font files.
- The process listens on `0.0.0.0:8080` (`PORT` / `HOST` can be overridden).
- Do not bind-mount `node_modules` from the host into the image.
- Rebuild after source changes: `docker build -t supersimple-heic .` or `docker compose up --build`.

## Stack

React 19, TypeScript, Vite, TanStack Start, Tailwind CSS.

## License

MIT. HEVC / HEIF may be subject to third-party patents. This project does not grant a patent license.
