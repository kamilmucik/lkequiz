package routes

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/auth/pb"
)

type PasswordRestoreRequestBody struct {
	Email string `json:"email"`
}

func PasswordRestore(ctx *gin.Context, c pb.AuthServiceClient) {
	b := PasswordRestoreRequestBody{}

	if err := ctx.BindJSON(&b); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	res, err := c.PasswordRestore(context.Background(), &pb.PasswordRestoreRequest{
		Email: b.Email,
	})

	if err != nil {
		ctx.AbortWithError(http.StatusBadGateway, err)
		return
	}

	ctx.JSON(http.StatusOK, &res)
}
