package quiz

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/quiz/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, authSvc *auth.ServiceClient) {
	a := auth.InitAuthMiddleware(authSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/quiz")
	routesSecured := r.Group("/quiz/secure")
	routesSecured.Use(a.AuthRequired)
	routes.GET("/:categoryId/:currentPage/:pageSize/", svc.FindPaggedQuiz)
}

func (svc *ServiceClient) FindPaggedQuiz(ctx *gin.Context) {
	routes.FindPaggedQuiz(ctx, svc.Client)
}
