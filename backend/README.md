
### INIT
mkdir api-gateway auth-svc question-svr heartbeat-svc

cd api-gateway
go mod init github.com/kamilmucik/api-gateway
go get github.com/gin-gonic/gin
go get github.com/spf13/viper
go get google.golang.org/grpc
go get github.com/gin-contrib/cors


mkdir -p cmd pkg/config/envs pkg/auth/pb pkg/auth/routes pkg/deparment/pb pkg/deparment/routes pkg/category/pb pkg/category/routes pkg/question/pb pkg/question/routes

touch Makefile cmd/main.go pkg/config/envs/dev.env pkg/config/config.go

touch pkg/auth/pb/auth.proto pkg/auth/routes/login.go pkg/auth/routes/register.go pkg/auth/client.go pkg/auth/middleware.go pkg/auth/routes.go

touch pkg/deparment/pb/deparment.proto pkg/deparment/routes/find_all.go pkg/deparment/routes/find_one.go pkg/deparment/client.go pkg/deparment/routes.go

touch pkg/category/pb/category.proto pkg/category/routes/find_all.go pkg/category/client.go pkg/category/routes.go

touch pkg/question/pb/category.proto pkg/question/routes/find_all.go pkg/question/client.go pkg/question/routes.go



cd auth-svc
go get github.com/spf13/viper
go get google.golang.org/grpc
go get gorm.io/gorm
go get gorm.io/driver/postgres
go get golang.org/x/crypto/bcrypt
go get github.com/golang-jwt/jwt

mkdir -p cmd pkg/config/envs pkg/db pkg/models pkg/pb pkg/services pkg/utils






go mod init github.com/kamilmucik/question-svc
go get github.com/spf13/viper
go get google.golang.org/grpc
go get gorm.io/gorm
go get gorm.io/driver/postgres

mkdir -p cmd pkg/config/envs pkg/db pkg/models pkg/pb pkg/services

touch Makefile cmd/main.go pkg/config/envs/dev.env pkg/config/config.go
touch pkg/pb/product.proto pkg/db/db.go pkg/models/stock_decrease_log.go pkg/models/product.go pkg/services/product.go




https://dev.to/neelp03/building-a-file-upload-service-in-go-34fj
```bash
mkdir -p storage-svc
cd storage-svc
go mod init github.com/kamilmucik/storage-svc
go get github.com/spf13/viper
go get google.golang.org/grpc
go get gorm.io/gorm
go get gorm.io/driver/postgres


mkdir -p cmd
touch cmd/main.go
mkdir -p pkg/config
touch pkg/config/config.go
mkdir -p pkg/config/envs
touch pkg/config/envs/dev.env
mkdir -p pkg/db
touch pkg/db/db.go
mkdir -p pkg/model
touch pkg/model/profil.go
mkdir -p pkg/pb
touch pkg/pb/profil.proto
mkdir -p pkg/service
touch pkg/service/profil.go
touch Makefile
```
```bash
mkdir -p user-svc
cd user-svc
go mod init github.com/kamilmucik/user-svc
go get github.com/spf13/viper
go get google.golang.org/grpc
go get gorm.io/gorm
go get gorm.io/driver/postgres

mkdir -p cmd
touch cmd/main.go
mkdir -p pkg/config
touch pkg/config/config.go
mkdir -p pkg/config/envs
touch pkg/config/envs/dev.env
mkdir -p pkg/db
touch pkg/db/db.go
mkdir -p pkg/model
touch pkg/model/profil.go
mkdir -p pkg/pb
touch pkg/pb/profil.proto
mkdir -p pkg/service
touch pkg/service/profil.go
touch Makefile
```

make proto


Test and code coverage
go test -coverprofile=coverage.out ./...         
go tool cover -html=coverage.out -o coverage.html

```bash
docker build -t kamilmucik/api-gateway-svc:1.4.2-SNAPSHOT -f Dockerfile.gateway .
docker build -t kamilmucik/auth-svc:1.4.2-SNAPSHOT -f Dockerfile.auth .
docker build -t kamilmucik/question-svc:1.4.1-SNAPSHOT -f Dockerfile.question .
docker build -t kamilmucik/user-svc:1.4.2-SNAPSHOT -f Dockerfile.user .
docker build -t kamilmucik/storage-svc:1.4.2-SNAPSHOT -f Dockerfile.storage .
```

```bash
docker build --platform linux/amd64 -t kamilmucik/api-gateway-svc:1.4.1-SNAPSHOT -f Dockerfile.gateway .
docker build --platform linux/amd64 -t kamilmucik/auth-svc:1.4.1-SNAPSHOT -f Dockerfile.auth .
docker build --platform linux/amd64 -t kamilmucik/question-svc:1.4.1-SNAPSHOT -f Dockerfile.question .
docker build --platform linux/amd64 -t kamilmucik/user-svc:1.4.1-SNAPSHOT -f Dockerfile.user .
docker build --platform linux/amd64 -t kamilmucik/storage-svc:1.4.1-SNAPSHOT -f Dockerfile.storage .
```

```bash
docker push kamilmucik/api-gateway-svc:1.3
docker push kamilmucik/auth-svc:1.2
docker push kamilmucik/question-svc:1.1
```

```bash
docker  build -t kamilmucik/api-gateway-svc:1.4-SNAPSHOT -f Dockerfile.gateway --push .
docker  build -t kamilmucik/auth-svc:1.4-SNAPSHOT -f Dockerfile.auth --push .


docker buildx build --platform linux/amd64,linux/arm64 -t kamilmucik/api-gateway-svc:latest -f Dockerfile.gateway --push .
docker buildx build --platform linux/amd64,linux/arm64 -t kamilmucik/auth-svc:latest -f Dockerfile.auth --push .
docker buildx build --platform linux/amd64,linux/arm64 -t kamilmucik/question-svc:latest -f Dockerfile.question --push .
```

TODO:
- serwis z autoryzacją i bez
- relacje jeden do wielu (lista pytań z listą odpowiedzi w obiekcie)
- osobny middleware dla mojego projektu
- kopia serwisu autoryzującego
- testy jednostkowe
- testy wydajnościowe
- prometheus + grafana
- budowa obrazu i odpalanie na docker
- codecoverage
- sonarqube
- jenkins PR i release


docker-compose up --force-recreate -d --build user_db
docker-compose up --force-recreate -d --build question_db
docker-compose up --force-recreate -d --build question-svc
docker-compose up --force-recreate -d --build auth-svc
docker-compose up --force-recreate -d --build api-gateway-svc