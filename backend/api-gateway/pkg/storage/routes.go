package profile

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/middleware"
	"github.com/kamilmucik/api-gateway/pkg/storage/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, middlewareSvc *middleware.ServiceClient) {
	middleware := middleware.InitMiddleware(middlewareSvc)
	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routesSecured := r.Group("/storage")

	routesSecured.GET("/:url_path", middleware.AuthRequired, svc.FindOne)
	routesSecured.POST("/", middleware.AuthRequired, svc.Upload)
}

func (svc *ServiceClient) Upload(ctx *gin.Context) {
	routes.Upload(ctx, svc.Client)
}
func (svc *ServiceClient) FindOne(ctx *gin.Context) {
	routes.FindOne(ctx, svc.Client)
}
