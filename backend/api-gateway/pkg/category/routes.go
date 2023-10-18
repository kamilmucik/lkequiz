package category

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	"github.com/kamilmucik/api-gateway/pkg/category/routes"
	"github.com/kamilmucik/api-gateway/pkg/config"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, authSvc *auth.ServiceClient) {
	a := auth.InitAuthMiddleware(authSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/category")
	routes.Use(a.AuthRequired)
	//routes.GET("/:id", svc.FindOne)
	routes.GET("/:id", svc.FindAllCategories)
}

//	func (svc *ServiceClient) FindOne(ctx *gin.Context) {
//		routes.FineOne(ctx, svc.Client)
//	}
func (svc *ServiceClient) FindAllCategories(ctx *gin.Context) {
	routes.FindAllCategories(ctx, svc.Client)
}
