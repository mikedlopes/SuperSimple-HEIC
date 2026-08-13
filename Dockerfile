# SuperSimple-HEIC — production image (Node 22)
#   docker build -t supersimple-heic .
#   docker run --rm -p 8080:8080 supersimple-heic

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
COPY --from=build /app/.output ./.output
EXPOSE 8080
USER node
CMD ["node", ".output/server/index.mjs"]
