FROM node:18-slim-buster
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["/bin/bash", "-c","yarn run start"]