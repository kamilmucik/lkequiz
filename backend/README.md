
### INIT
mkdir api-gateway auth-svc question-svr heartbeat-svc

cd api-gateway
go mod init github.com/kamilmucik/api-gateway
go get github.com/gin-gonic/gin
go get github.com/spf13/viper
go get google.golang.org/grpc

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


make proto




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
