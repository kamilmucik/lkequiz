package routes

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/profile/pb"
)

func FineOne(ctx *gin.Context, c pb.ProfileServiceClient) {
	// log.Printf("profile.FindOne: ")
	// id, _ := strconv.ParseInt(ctx.Param("id"), 10, 32)

	v := ctx.Request.Context().Value("userId")
	if v != nil {
		if userId, ok := v.(int64); ok {
			res, err := c.FindOne(context.Background(), &pb.FindOneRequest{
				UserId: userId,
			})

			if err != nil {
				ctx.AbortWithError(http.StatusBadGateway, err)
				return
			}

			// log.Printf("profile.FindOne: %s", res)
			ctx.JSON(http.StatusOK, &res)
		}
	} else {
		ctx.JSON(http.StatusBadRequest, "nie ma user ID")
	}
}
