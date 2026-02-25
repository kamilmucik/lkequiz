package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth/routes"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/middleware"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, middlewareSvc *middleware.ServiceClient) *ServiceClient {
	middleware := middleware.InitMiddleware(middlewareSvc)
	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	routes := r.Group("/auth")
	routes.POST("/register", svc.Register)
	routes.POST("/login", svc.Login)
	routes.POST("/password-restore", svc.PasswordRestore)

	routes.GET("/user-info", middleware.AuthRequired, svc.UserInfo)

	return svc
}

func (svc *ServiceClient) Register(ctx *gin.Context) {
	routes.Register(ctx, svc.Client)
}

func (svc *ServiceClient) Login(ctx *gin.Context) {
	routes.Login(ctx, svc.Client)
}
func (svc *ServiceClient) PasswordRestore(ctx *gin.Context) {
	routes.PasswordRestore(ctx, svc.Client)
}
func (svc *ServiceClient) UserInfo(ctx *gin.Context) {
	routes.UserInfo(ctx, svc.Client)
}
