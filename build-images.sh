#!/bin/sh

source "$NVM_DIR/nvm.sh"

git clone --branch="$REPO_BRANCH" "$REPO_URL"
cd mds-core

#Dockerfiles are broken in Docker 18.0 and newer. We fix them here
for dir in container-images/*
do
    sed -i 's#COPY dist/\* \.#COPY dist/* ./#' $dir/Dockerfile
done

nvm install
pnpm install

pnpm $@

