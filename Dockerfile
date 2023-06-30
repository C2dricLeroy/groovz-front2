FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]
