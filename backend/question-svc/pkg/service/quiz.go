package service

import (
	"context"
	"github.com/kamilmucik/question-svc/pkg/db"
	"github.com/kamilmucik/question-svc/pkg/model"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
	"net/http"
)

type QuizServer struct {
	H db.Handler
}

func (s *QuizServer) FindPaggedQuiz(ctx context.Context, req *pb.FindPaggedQuizRequest) (*pb.FindPaggedQuizResponse, error) {
	var questions []model.Question
	var list []*pb.FindPaggedQuizData
	var totalPages int64 = 0
	
	_, err := s.H.DB.Raw("select * From lke_select_rand_questions(?,?)",req.CategoryId,req.PageSize).Preload("Answers").Find(&questions).Rows()
	if err != nil {
		return &pb.FindPaggedQuizResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}
	
	for _, question := range questions {
		fd := pb.FindPaggedQuizData{Id: question.Id, Code: question.Number, Question: question.Question}
		for _, answer := range question.Answers {
			fa := pb.FindQuizAnswerData{Answer: answer.Answer, Correct: answer.Correct, Id: answer.Id}
			fd.Answers = append(fd.Answers, &fa)
		}
		list = append(list, &fd)
	}

	return &pb.FindPaggedQuizResponse{
		Status: http.StatusOK,
		TotalPage: totalPages,
		Data:   list,
	}, nil
}
