package service

import (
	"context"
	"log"
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
