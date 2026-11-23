FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev --no-audit --no-fund
COPY . .
RUN npm run build
FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server ./server
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server/index.mjs"]
