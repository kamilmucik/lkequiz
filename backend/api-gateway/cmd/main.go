package main

import (
	"log"

	category "github.com/kamilmucik/api-gateway/pkg/category"
	department "github.com/kamilmucik/api-gateway/pkg/department"
	question "github.com/kamilmucik/api-gateway/pkg/question"

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

	authSvc := *auth.RegisterRoutes(r, &c)
	department.RegisterRoutes(r, &c, &authSvc)
	category.RegisterRoutes(r, &c, &authSvc)
	question.RegisterRoutes(r, &c, &authSvc)

	r.Run(c.Port)
}
