package profile

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/middleware"
	"github.com/kamilmucik/api-gateway/pkg/profile/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, middlewareSvc *middleware.ServiceClient) {
	middleware := middleware.InitMiddleware(middlewareSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/profile")

	routes.GET("/", middleware.AuthRequired, svc.FindOne)
	routes.PUT("/", middleware.AuthRequired, svc.UpdateProfile)
	// routes.POST("/", middleware.AuthRequired, svc.UpdateProfile)
}

func (svc *ServiceClient) FindOne(ctx *gin.Context) {
	routes.FineOne(ctx, svc.Client)
}

func (svc *ServiceClient) UpdateProfile(ctx *gin.Context) {
	routes.UpdateProfile(ctx, svc.Client)
}
