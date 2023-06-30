FROM node:18-alpine
COPY . .
RUN npm install
EXPOSE 3000
CMD ["/bin/bash", "-c","npm run start"]