package department

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/department/routes"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, authSvc *auth.ServiceClient) {
	a := auth.InitAuthMiddleware(authSvc)

	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/department")
	routesSecured := r.Group("/department/secure")
	routesSecured.Use(a.AuthRequired)
	// routes.GET("/:id", svc.FindOne)
	routes.GET("/", svc.FindAll)
	routes.GET("/:quizId/", svc.FindAll) //zmiana na przyszłość
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
