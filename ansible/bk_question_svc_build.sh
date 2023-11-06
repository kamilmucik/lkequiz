#!/bin/sh

VERSION=$1

echo "\n1. Docker prune images $VERSION"

# docker image prune --force

docker images

cd /tmp/lkequiz/

echo "\n2. Docker: create image"
docker build -t question-svc:$VERSION -f Dockerfile.question .

echo "\n3. Docker images"
docker images

