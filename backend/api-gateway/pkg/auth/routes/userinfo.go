package routes

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth/pb"
)

func UserInfo(ctx *gin.Context, c pb.AuthServiceClient) {
	v := ctx.Request.Context().Value("userId")
	if v != nil {
		if i, ok := v.(int64); ok {
			res, err := c.UserInfo(context.Background(), &pb.UserInfoRequest{
				UserId: i,
			})
			if err != nil {
				ctx.AbortWithError(http.StatusBadGateway, err)
				return
			}
			ctx.JSON(http.StatusOK, &res)
		}
	} else {
		log.Printf("nie ma user ID")
	}
}
