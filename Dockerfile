# SuperSimple-HEIC — slim production image (Node 22, Alpine)
#   docker build -t supersimple-heic .
#   docker run --rm -p 8080:8080 supersimple-heic

# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS build
WORKDIR /app
COPY . .
ENV NITRO_PRESET=node-server
ENV NODE_ENV=production
RUN npm run build && node scripts/slim-output.mjs

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
