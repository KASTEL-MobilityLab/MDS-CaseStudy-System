FROM node:16.14.2-alpine3.15

ENV NVM_DIR=/root/.nvm PNPM_HOME=/root/.local/share/pnpm PATH=/root/.local/share/pnpm:${PATH}

RUN apk add bash docker git jq wget

RUN mkdir /nvm && wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | sh

#RUN wget -qO- https://get.pnpm.io/install.sh | PNPM_VERSION=6.32.11 sh
RUN npm install -g pnpm@6.32.11

COPY ./build-images.sh ./

ENTRYPOINT ["./build-images.sh"]
