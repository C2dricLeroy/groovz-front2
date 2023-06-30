FROM node:18-slim
COPY . .
RUN apt-get install -y yarn && yarn install
EXPOSE 3000
CMD ["/bin/bash", "-c","yarn run start"]