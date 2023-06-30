FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -y
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]
