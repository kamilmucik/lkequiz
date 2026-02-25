package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/config"
)

func RegisterRoutes(r *gin.Engine, c *config.Config) *ServiceClient {
	svc := &ServiceClient{
		Client: InitServiceClient(c),
	}

	return svc
}
