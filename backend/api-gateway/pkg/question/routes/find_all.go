package routes

import (
	"context"
	"net/http"
	// "strconv"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/question/pb"
)

func FindAllQuestions(ctx *gin.Context, c pb.QuestionServiceClient) {
	//id, _ := strconv.ParseInt(ctx.Param("id"), 10, 32) 

	res, err := c.FindAllQuestions(context.Background(), &pb.FindAllQuestionsRequest{
		Query: ctx.Param("query"),
	})

	if err != nil {
		ctx.AbortWithError(http.StatusBadGateway, err)
		return
	}

	ctx.JSON(http.StatusOK, &res)
}
