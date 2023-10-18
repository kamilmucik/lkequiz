package service

import (
	"context"
	"log"
	"net/http"

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

		log.Printf("row: %s", fd)

		list = append(list, fd)
	}

	return &pb.FindAllCategoriesResponse{
		Status: http.StatusOK,
		Data:   list,
	}, nil
}
