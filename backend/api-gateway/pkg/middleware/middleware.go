package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth/pb"
)

type MiddlewareConfig struct {
	svc *ServiceClient
}

func InitMiddleware(svc *ServiceClient) MiddlewareConfig {
	return MiddlewareConfig{svc}
}

func (c *MiddlewareConfig) AuthRequired(ctx *gin.Context) {
	authorization := ctx.Request.Header.Get("Authorization")

	// log.Printf("middleware.AuthRequired.authorization: %s", authorization)

	if authorization == "" {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token := strings.Split(authorization, "Bearer ")

	if len(token) < 2 {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// log.Printf("middleware.AuthRequired.token: %s", token)
	// log.Printf("middleware.AuthRequired.token: %s", c.svc.Client)
	res, err := c.svc.Client.Validate(context.Background(), &pb.ValidateRequest{
		Token: token[1],
	})

	// log.Printf("middleware.AuthRequired.res: %s", res)
	// log.Printf("middleware.AuthRequired.err: %s", err)

	if err != nil || res.Status != http.StatusOK {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	ctx.Set("userId", res.UserId)
	// log.Printf("middleware.AuthRequired.res: %d", res.UserId)
	ctx2 := context.WithValue(ctx.Request.Context(), "userId", res.UserId)
	ctx.Request = ctx.Request.WithContext(ctx2)
	// ctx.Request.WithContext(ctx.Request.Context(),"userId", res.UserId)
	// log.Printf("middleware.AuthRequired: %s", ctx.Value("userId").(string))

	ctx.Next()
}
