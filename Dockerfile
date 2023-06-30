FROM node:20-buster-slim
COPY . .
EXPOSE 3000
CMD ["/bin/bash", "-c","npx yarn install && npx yarn build && npx yarn start"]