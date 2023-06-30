FROM node:20-buster-slim
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["/bin/bash", "-c","yarn run start"]