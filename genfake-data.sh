cp docker-compose.dev.yml docker-compose.yml

cp .env.sample .env

docker-compose up -d server

bin/initdb.sh

docker-compose up -d client

docker-compose build base

docker-compose run fake

