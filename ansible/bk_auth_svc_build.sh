#!/bin/sh

VERSION=$1

echo "\n1. Docker prune images $VERSION"

# docker image prune --force

docker images

cd /tmp/lkequiz/

echo "\n2. Docker: create image"
docker build -t auth-svc:$VERSION -f Dockerfile.auth .

echo "\n3. Docker images"
docker images

