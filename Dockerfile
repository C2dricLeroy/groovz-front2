FROM node:20-buster-slim
COPY . .
RUN npx yarn install
EXPOSE 3000
CMD ["/bin/bash", "-c","npx yarn start"]