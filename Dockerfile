FROM node:16.14.2-alpine3.15

ENV REPO_URL=https://github.com/lacuna-tech/mds-core.git REPO_BRANCH=master

ENV NVM_DIR=/root/.nvm PNPM_HOME=/root/.local/share/pnpm PATH=/root/.local/share/pnpm:${PATH}

RUN apk add bash docker git jq wget

RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | sh

#RUN wget -qO- https://get.pnpm.io/install.sh | PNPM_VERSION=6.32.11 sh


COPY ./build-images.sh ./

ENTRYPOINT ["./build-images.sh"]

CMD ["start"]
#used to be image
