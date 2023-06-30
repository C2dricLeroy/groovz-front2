FROM node:18-slim
WORKDIR /app
COPY . .

EXPOSE 3000
CMD ["/bin/bash", "-c","npm run start"]
