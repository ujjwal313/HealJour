#!/bin/sh

set -eu

cd ~/healjour-fe-dev



npm i

if npx -y pm2 ls | grep healjour-fe-dev
then
    npx -y pm2 save
    npx -y pm2 del healjour-fe-dev
    cd ~/healjour-fe-dev
    npx -y pm2 serve -f ~/healjour-fe-dev/ 8000 --spa
    npx -y pm2 save
else
    npx -y pm2 save
    cd ~/healjour-fe-dev
    npx -y pm2 serve -f ~/healjour-fe-dev/ 8000 --spa
    npx -y pm2 save
fi