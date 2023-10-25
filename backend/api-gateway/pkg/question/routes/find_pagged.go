package routes

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/question/pb"
)

func FindPaggedQuestions(ctx *gin.Context, c pb.QuestionServiceClient) {
	categoryId, _ := strconv.ParseInt(ctx.Param("categoryId"), 10, 32)
	currentPage, _ := strconv.ParseInt(ctx.Param("currentPage"), 10, 32)
	pageSize, _ := strconv.ParseInt(ctx.Param("pageSize"), 10, 32)

	res, err := c.FindPaggedQuestions(context.Background(), &pb.FindPaggedQuestionsRequest{
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
