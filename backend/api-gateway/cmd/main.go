package main

import (
	"log"
	"time"
	category "github.com/kamilmucik/api-gateway/pkg/category"
	department "github.com/kamilmucik/api-gateway/pkg/department"
	question "github.com/kamilmucik/api-gateway/pkg/question"
	quiz "github.com/kamilmucik/api-gateway/pkg/quiz"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	"github.com/kamilmucik/api-gateway/pkg/config"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	r := gin.Default()
	// CORS for https://foo.com and https://github.com origins, allowing:
	// - PUT and PATCH methods
	// - Origin header
	// - Credentials share
	// - Preflight requests cached for 12 hours

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:3000","http://localhost:3001"},
	// 	// AllowMethods:     []string{"PUT", "GET", "POST", "PATCH", "DELETE"},
	// 	AllowHeaders:     []string{"Access-Control-Allow-Origin","Access-Control-Allow-Headers","Content-Type","Authorization"},
	// }))
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000","http://info.e-strix.pl","https://lke.e-strix.pl"},
		AllowMethods:     []string{"PUT", "GET", "POST", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Access-Control-Allow-Origin","Access-Control-Allow-Headers"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {
		// return origin == "https://github.com"
		// },
		MaxAge: 12 * time.Hour,

	}))

	// config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}
	// r.Use(cors.New(config))
	// r.Use(cors.Default())



	authSvc := *auth.RegisterRoutes(r, &c)
	department.RegisterRoutes(r, &c, &authSvc)
	category.RegisterRoutes(r, &c, &authSvc)
	question.RegisterRoutes(r, &c, &authSvc)
	quiz.RegisterRoutes(r, &c, &authSvc)

	r.Run(c.Port)
}
