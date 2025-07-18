FROM node:22-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Prepare static files
FROM base AS build-front
COPY ./ ./
RUN npm ci
RUN npm run build

# Release
FROM base AS release
COPY --from=build-front /usr/app/dist ./public
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
COPY ./server/index.js ./
RUN npm ci --omit=dev

CMD ["node", "index.js"]
