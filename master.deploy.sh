#!/bin/sh

set -eu

cd ~/healjour-fe-dev



npm i

if npx pm2 ls | grep healjour-fe-dev
then
    npx pm2 del healjour-fe-dev
    cd ~/healjour-fe-dev
    npx pm2 start dev.ecosystem.config.js
else
    cd ~/healjour-fe-dev
    npx pm2 start dev.ecosystem.config.js
fi