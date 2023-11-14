package routes

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/quiz/pb"
)

func FindPaggedQuiz(ctx *gin.Context, c pb.QuizServiceClient) {
	categoryId, _ := strconv.ParseInt(ctx.Param("categoryId"), 10, 32)
	currentPage, _ := strconv.ParseInt(ctx.Param("currentPage"), 10, 32)
	pageSize, _ := strconv.ParseInt(ctx.Param("pageSize"), 10, 32)

	res, err := c.FindPaggedQuiz(context.Background(), &pb.FindPaggedQuizRequest{
		CategoryId: int64(categoryId),
		CurrentPage: int64(currentPage),
		PageSize: int64(pageSize),
	})

	if err != nil {
		ctx.AbortWithError(http.StatusBadGateway, err)
		return
	}

	ctx.JSON(http.StatusOK, &res)
}
