FROM bullseye-slim

RUN apt update && apt upgrade -y && apt install curl -y  \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -  \
    sudo apt policy nodejs -y && sudo apt install nodejs -y  \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
    sudo apt install yarn && npx yarn install && npx yarn build

COPY . .
EXPOSE 3000
CMD ["/bin/bash", "-c","npx yarn start"]