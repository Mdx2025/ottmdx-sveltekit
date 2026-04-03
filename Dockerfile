FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=build /app/build ./build
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "serve -s build -l ${PORT}"]
