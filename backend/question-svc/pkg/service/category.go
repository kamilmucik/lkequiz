package service

import (
	"context"
	"log"
	"net/http"
	"math"
	"github.com/kamilmucik/question-svc/pkg/db"
	"github.com/kamilmucik/question-svc/pkg/model"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
)

type CatServer struct {
	H db.Handler
}

func (s *CatServer) FindAllCategories(ctx context.Context, req *pb.FindAllCategoriesRequest) (*pb.FindAllCategoriesResponse, error) {
	var category model.Category

	log.Printf("category.FindAll: %s", req)

	var list []*pb.FindCategoryData

	rows, err := s.H.DB.Model(&category).Select("id, name, department_id").Where("department_id", req.Id).Rows()
	if err != nil {
		return &pb.FindAllCategoriesResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	defer rows.Close()
	for rows.Next() {
		fd := new(pb.FindCategoryData)
		rows.Scan(&fd.Id, &fd.Name, &fd.DepartmentId)

		// log.Printf("row: %s", fd)

		list = append(list, fd)
	}

	return &pb.FindAllCategoriesResponse{
		Status: http.StatusOK,
		Data:   list,
	}, nil
}

func (s *CatServer) FindPaggedCategories(ctx context.Context, req *pb.FindPaggedCategoriesRequest) (*pb.FindPaggedCategoriesResponse, error) {
	var categories []model.Category
	var list []*pb.FindPaggedCategoriesData
	var totalRows int64 = 0

	// log.Printf("category.FindPaggedCategories: %s", req)
	// log.Printf("DepartmentId: %d ", req.DepartmentId)

    s.H.DB.Model(categories).Where("department_id = ?", req.DepartmentId).Count(&totalRows)
	totalPages := int64(math.Ceil(float64(totalRows) / float64(req.PageSize)))  

	rows, err := s.H.DB.Model(&model.Category{}).Scopes(newPaginate(int(req.PageSize),int(req.CurrentPage)).paginatedResult).Where("department_id = ?", req.DepartmentId).Find(&categories).Rows()
	if err != nil {
		return &pb.FindPaggedCategoriesResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	defer rows.Close()
	for _, category := range categories {
		fd := pb.FindPaggedCategoriesData{Name: category.Name, Id: category.OwnId, DepartmentId: category.DepartmentId, Code: category.Code}
		list = append(list, &fd)
	}

	return &pb.FindPaggedCategoriesResponse{
		Status: http.StatusOK,
		TotalPage: totalPages,
		Data:   list,
	}, nil
}