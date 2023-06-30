FROM node:14-slim
COPY . .
RUN apt-get update && apt-get install -y npm
RUN npm install
EXPOSE 3000
CMD ["/bin/bash", "-c","npm run start"]
