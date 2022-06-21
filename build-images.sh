#!/bin/sh

source "$NVM_DIR/nvm.sh"

git clone --branch="$REPO_BRANCH" "$REPO_URL"
cd mds-core

nvm install
npm install -g pnpm@6.32.11
#pnpm config set auto-install-peers=true
echo "installation von pnpm über npm klappt"
pnpm --version
which pnpm
pnpm install
echo "pnpm install klappt"

#pnpm $@

