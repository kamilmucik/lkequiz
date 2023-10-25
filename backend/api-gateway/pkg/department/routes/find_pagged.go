package routes

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/department/pb"
)

func FindPagged(ctx *gin.Context, c pb.DepartmentServiceClient) {
	quizId, _ := strconv.ParseInt(ctx.Param("quizId"), 10, 32)
	currentPage, _ := strconv.ParseInt(ctx.Param("currentPage"), 10, 32)
	pageSize, _ := strconv.ParseInt(ctx.Param("pageSize"), 10, 32)

	res, err := c.FindPagged(context.Background(), &pb.FindPaggedRequest{
		QuizId: int64(quizId),
		CurrentPage: int64(currentPage),
		PageSize: int64(pageSize),
	})

	if err != nil {
		ctx.AbortWithError(http.StatusBadGateway, err)
		return
	}

	ctx.JSON(http.StatusOK, &res)
}
