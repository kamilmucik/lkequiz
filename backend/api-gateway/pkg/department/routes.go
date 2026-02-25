package department

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/department/routes"
	"github.com/kamilmucik/api-gateway/pkg/middleware"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, middlewareSvc *middleware.ServiceClient) {
	middleware := middleware.InitMiddleware(middlewareSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/department")
	routesSecured := r.Group("/secured/department/")
	routesSecured.Use(middleware.AuthRequired)
	// routes.GET("/:id", svc.FindOne)
	routes.GET("/", svc.FindAll)
	// routes.GET("/:quizId/", svc.FindAll) //zmiana na przyszłość
	routes.GET("/:quizId/:currentPage/:pageSize/", svc.FindPagged)

	routesSecured.GET("/:quizId/:currentPage/:pageSize/", svc.FindPagged)
}

func (svc *ServiceClient) FindOne(ctx *gin.Context) {
	routes.FineOne(ctx, svc.Client)
}
func (svc *ServiceClient) FindAll(ctx *gin.Context) {
	routes.FindAll(ctx, svc.Client)
}
func (svc *ServiceClient) FindPagged(ctx *gin.Context) {
	routes.FindPagged(ctx, svc.Client)
}
