FROM node:20-buster-slim
COPY . .
RUN npx yarn install --network-timeout 100000
EXPOSE 3000
CMD ["/bin/bash", "-c","npx yarn start"]