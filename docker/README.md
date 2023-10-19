
docker-compose up --force-recreate --no-deps --remove-orphans -d --build user_db
docker-compose up --force-recreate --no-deps --remove-orphans -d --build question_db

docker-compose up --force-recreate --no-deps --remove-orphans -d --build api-gateway
docker-compose up --force-recreate --no-deps --remove-orphans -d --build svc-auth
docker-compose up --force-recreate --no-deps --remove-orphans -d --build svc-question