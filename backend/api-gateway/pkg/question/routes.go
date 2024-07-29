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
	routesSecured := r.Group("/department/secure")
	routesSecured.Use(a.AuthRequired)
	//routes.GET("/:id", svc.FindOne)
	routes.GET("/find/:query/", svc.FindAllQuestions)
	routes.GET("/:categoryId/:currentPage/:pageSize/", svc.FindPaggedQuestions)
}

//	func (svc *ServiceClient) FindOne(ctx *gin.Context) {
//		routes.FineOne(ctx, svc.Client)
//	}
func (svc *ServiceClient) FindAllQuestions(ctx *gin.Context) {
	routes.FindAllQuestions(ctx, svc.Client)
}
func (svc *ServiceClient) FindPaggedQuestions(ctx *gin.Context) {
	routes.FindPaggedQuestions(ctx, svc.Client)
}
