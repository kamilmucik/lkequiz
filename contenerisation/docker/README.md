
docker-compose up -d --build user-db-svc
docker-compose up -d --build question-db-svc


docker-compose up --build flyway

docker-compose up -d --build auth-svc
docker-compose up -d --build question-svc
docker-compose up -d --build api-gateway-svc


docker-compose down