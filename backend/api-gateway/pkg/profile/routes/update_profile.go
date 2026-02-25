package routes

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/profile/pb"
)

type UpdateProfileRequestBody struct {
	Fullname            string `json:"fullname"`
	Username            string `json:"username"`
	ProfileImageUrl     string `json:"profileImageUrl"`
	OnboardingCompleted bool   `json:"onboardingCompleted"`
}

func UpdateProfile(ctx *gin.Context, c pb.ProfileServiceClient) {
	log.Printf("profile.UpdateProfile: ")

	v := ctx.Request.Context().Value("userId")
	if v != nil {
		if userId, ok := v.(int64); ok {
			body := UpdateProfileRequestBody{}

			if err := ctx.BindJSON(&body); err != nil {
				ctx.AbortWithError(http.StatusBadRequest, err)
				return
			}

			res, err := c.UpdateProfile(context.Background(), &pb.UpdateProfileRequest{
				UserId:              userId,
				Fullname:            body.Fullname,
				Username:            body.Username,
				ProfileImageUrl:     body.ProfileImageUrl,
				OnboardingCompleted: body.OnboardingCompleted,
			})

			if err != nil {
				ctx.AbortWithError(http.StatusBadGateway, err)
				return
			}

			ctx.JSON(http.StatusOK, &res)
		}
	} else {
		ctx.JSON(http.StatusBadRequest, "nie ma user ID")
	}

}
