package routes

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/category/pb"
)

func FindPaggedCategories(ctx *gin.Context, c pb.CategoryServiceClient) {
	departmentId, _ := strconv.ParseInt(ctx.Param("departmentId"), 10, 32)
	currentPage, _ := strconv.ParseInt(ctx.Param("currentPage"), 10, 32)
	pageSize, _ := strconv.ParseInt(ctx.Param("pageSize"), 10, 32)

	res, err := c.FindPaggedCategories(context.Background(), &pb.FindPaggedCategoriesRequest{
		DepartmentId: int64(departmentId),
		CurrentPage: int64(currentPage),
		PageSize: int64(pageSize),
	})

	if err != nil {
		ctx.AbortWithError(http.StatusBadGateway, err)
		return
	}

	ctx.JSON(http.StatusOK, &res)
}
