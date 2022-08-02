#!/bin/sh
source "$NVM_DIR/nvm.sh"

git clone https://github.com/lacuna-tech/mds-core.git
cd mds-core

#Dockerfiles are broken in Docker 18.0 and newer. We fix them here
for dir in container-images/*
do
    sed -i 's#COPY dist/\* \.#COPY dist/* ./#' $dir/Dockerfile
done

nvm install
pnpm install

docker buildx create --use
pnpm run $@
