# syntax=docker/dockerfile:1
# SuperSimple-HEIC — slim production image (Node 22, Alpine)
#   docker build -t supersimple-heic .
#   docker run --rm -p 8080:8080 supersimple-heic
#
# Cache mounts (BuildKit) keep the npm download cache on the builder between
# builds. They are NOT copied into the image. Requires BuildKit (Docker 23+
# default; or DOCKER_BUILDKIT=1).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# sharing=locked: one writer if two builds run at once (npm cache is not safe
# for concurrent writers). id= is stable so compose and `docker build` share it.
RUN --mount=type=cache,id=supersimple-heic-npm,target=/root/.npm,sharing=locked \
    npm ci

FROM deps AS build
WORKDIR /app
COPY . .
ENV NITRO_PRESET=node-server
ENV NODE_ENV=production
# Vite/Nitro incremental cache — survives source-only rebuilds.
RUN --mount=type=cache,id=supersimple-heic-vite,target=/app/node_modules/.vite,sharing=locked \
    --mount=type=cache,id=supersimple-heic-npm,target=/root/.npm,sharing=locked \
    npm run build && node scripts/slim-output.mjs

# Runtime: Node binary only — no npm, yarn, or headers
FROM node:22-alpine AS runner
RUN rm -rf \
      /usr/local/lib/node_modules \
      /usr/local/bin/npm \
      /usr/local/bin/npx \
      /usr/local/bin/corepack \
      /usr/local/include \
      /usr/local/share \
      /opt \
      /tmp/* \
    && adduser -D -H -u 1001 app
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
COPY --from=build --chown=app:app /app/.output ./.output
USER app
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
