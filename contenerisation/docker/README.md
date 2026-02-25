
```bash
docker-compose up -d --build user-db-svc
docker-compose up -d --build question-db-svc

docker-compose up --build flyway
```

```bash
docker-compose up -d --build profile-svc
docker-compose up -d --build auth-svc
docker-compose up -d --build storage-svc
docker-compose up -d --build question-svc
docker-compose up -d --build api-gateway-svc


docker-compose up -d --build lkequiz-web-svc
docker-compose up --build lkequiz-web-svc
```

```bash
docker-compose down
```