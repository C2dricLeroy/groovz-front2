FROM node:14-slim
COPY . .
EXPOSE 3000
CMD ["/bin/bash", "-c","npm install && npm run start"]
