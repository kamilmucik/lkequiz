#!/bin/bash

cd /home/ubuntu/git/
git clone https://github.com/kamilmucik/lkequiz.git
cd /home/ubuntu/git/lkequiz/
git checkout new_approach

cd backend/

docker build --platform linux/amd64 -t kamilmucik/api-gateway-svc:1.3.4-SNAPSHOT -f Dockerfile.gateway .
docker build --platform linux/amd64 -t kamilmucik/auth-svc:1.2.4-SNAPSHOT -f Dockerfile.auth .

docker push kamilmucik/api-gateway-svc:1.3.3-SNAPSHOT
docker push kamilmucik/auth-svc:1.2.3-SNAPSHOT

cd /home/ubuntu/lkequiz/
docker-compose up --force-recreate -d --build api-gateway-svc
docker-compose up --force-recreate -d --build auth-svc