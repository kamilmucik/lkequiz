package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	category "github.com/kamilmucik/api-gateway/pkg/category"
	"github.com/kamilmucik/api-gateway/pkg/config"
	department "github.com/kamilmucik/api-gateway/pkg/department"
	middleware "github.com/kamilmucik/api-gateway/pkg/middleware"
	profile "github.com/kamilmucik/api-gateway/pkg/profile"
	question "github.com/kamilmucik/api-gateway/pkg/question"
	quiz "github.com/kamilmucik/api-gateway/pkg/quiz"
	storage "github.com/kamilmucik/api-gateway/pkg/storage"
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
		AllowOrigins: []string{"http://162.19.227.81:3000", "http://162.19.227.81:3000/",
			"http://localhost:3000", "http://localhost:3000/",
			"http://localhost:8081", "http://localhost:8081/",
			"http://info.e-strix.pl",
			"http://lkequiz.pl", "http://lkequiz.pl/",
			"http://lke.e-strix.pl", "http://lke.e-strix.pl/"},
		AllowMethods: []string{"PUT", "GET", "POST", "PATCH", "DELETE"},
		AllowHeaders: []string{"Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type", "Authorization", "Apikey"},
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
	middlewareSvc := *middleware.RegisterRoutes(r, &c)

	auth.RegisterRoutes(r, &c, &middlewareSvc)
	department.RegisterRoutes(r, &c, &middlewareSvc)
	category.RegisterRoutes(r, &c, &middlewareSvc)
	question.RegisterRoutes(r, &c, &middlewareSvc)
	quiz.RegisterRoutes(r, &c, &middlewareSvc)

	profile.RegisterRoutes(r, &c, &middlewareSvc)
	storage.RegisterRoutes(r, &c, &middlewareSvc)

	r.Run(c.Port)
}
