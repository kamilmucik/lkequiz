package service

import (
	"context"
	"log"
	"math"
	"net/http"
	"github.com/kamilmucik/question-svc/pkg/db"
	"github.com/kamilmucik/question-svc/pkg/model"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
)

type Server struct {
	H db.Handler
}

func (s *Server) FindOne(ctx context.Context, req *pb.FindOneRequest) (*pb.FindOneResponse, error) {
	var department model.Department

	log.Printf("department.FindOne: %s", req)

	if result := s.H.DB.First(&department, req.Id); result.Error != nil {
		return &pb.FindOneResponse{
			Status: http.StatusNotFound,
			Error:  result.Error.Error(),
		}, nil
	}

	data := &pb.FindOneData{
		Id:   department.Id,
		Name: department.Name,
	}

	return &pb.FindOneResponse{
		Status: http.StatusOK,
		Data:   data,
	}, nil
}

func (s *Server) FindAll(ctx context.Context, req *pb.FindAllRequest) (*pb.FindAllResponse, error) {
	var department model.Department

	var list []*pb.FindData

	rows, err := s.H.DB.Model(&department).Select("id, name").Rows()
	if err != nil {
		return &pb.FindAllResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	defer rows.Close()
	for rows.Next() {
		fd := new(pb.FindData)
		rows.Scan(&fd.Id, &fd.Name)

		list = append(list, fd)
	}

	return &pb.FindAllResponse{
		Status: http.StatusOK,
		Data:   list,
	}, nil
}

func (s *Server) FindPagged(ctx context.Context, req *pb.FindPaggedRequest) (*pb.FindPaggedResponse, error) {
	var departments []model.Department
	var list []*pb.FindPaggedData
	var totalRows int64 = 0

    s.H.DB.Model(departments).Count(&totalRows)
	totalPages := int64(math.Ceil(float64(totalRows) / float64(req.PageSize)))  
	
	rows, err := s.H.DB.Model(&model.Department{}).Scopes(newPaginate(int(req.PageSize),int(req.CurrentPage)).paginatedResult).Find(&departments).Rows()
	if err != nil {
		return &pb.FindPaggedResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	defer rows.Close()
	for _, department := range departments {
		fd := pb.FindPaggedData{Name: department.Name, Id: department.OwnId}
		list = append(list, &fd)
	}

	return &pb.FindPaggedResponse{
		Status: http.StatusOK,
		TotalPage: totalPages,
		Data:   list,
	}, nil
}

