#!/bin/sh

export LKE_GATEWAY_MODULE="api-gateway-svc"
export LKE_AUTH_MODULE="auth-svc"
export LKE_QUESTION_MODULE="question-svc"

export LKE_GATEWAY_IMAGE=$(docker ps -a --filter="name=api-gateway-svc" --format="{{.Image}}")
export LKE_USER_IMAGE=$(docker ps -a --filter="name=auth-svc" --format="{{.Image}}")
export LKE_QUESTION_IMAGE=$(docker ps -a --filter="name=question-svc" --format="{{.Image}}")
export SOURCE_DIR=/tmp/lkequiz
export DESTINATION_DIR=/home/ubuntu/lkequiz

echo "\n1. Docker Deploy Front "${FILENAME}" "${MODULE}" "${VERSION}
#mkdir -p ${SOURCE_DIR}
cd ${SOURCE_DIR}

cp -ar ${SOURCE_DIR}/artifacts/* ${DESTINATION_DIR}
cd ${DESTINATION_DIR}

docker-compose up --build flyway
#sleep 15
#
#docker-compose up -d --build ${MODULE}
# docker-compose up -d --build ${RP_TEXTEXTRACTOR_MODULE}
# docker-compose up -d --build ${RP_SERVER_MODULE}

echo "\n3. Docker images"
docker images
#sleep 60

docker ps

