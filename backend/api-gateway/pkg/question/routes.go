package question

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/question/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, authSvc *auth.ServiceClient) {
	a := auth.InitAuthMiddleware(authSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/question")
	routes.Use(a.AuthRequired)
	//routes.GET("/:id", svc.FindOne)
	routes.GET("/:id", svc.FindAllQuestions)
}

//	func (svc *ServiceClient) FindOne(ctx *gin.Context) {
//		routes.FineOne(ctx, svc.Client)
//	}
func (svc *ServiceClient) FindAllQuestions(ctx *gin.Context) {
	routes.FindAllQuestions(ctx, svc.Client)
}
