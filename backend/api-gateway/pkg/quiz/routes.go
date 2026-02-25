package quiz

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/middleware"
	"github.com/kamilmucik/api-gateway/pkg/quiz/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, middlewareSvc *middleware.ServiceClient) {
	middleware := middleware.InitMiddleware(middlewareSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/quiz")
	routesSecured := r.Group("/quiz/secure")
	routesSecured.Use(middleware.AuthRequired)
	routes.GET("/:categoryId/:currentPage/:pageSize/", svc.FindPaggedQuiz)
}

func (svc *ServiceClient) FindPaggedQuiz(ctx *gin.Context) {
	routes.FindPaggedQuiz(ctx, svc.Client)
}
