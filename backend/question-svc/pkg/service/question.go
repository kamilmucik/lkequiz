package service

import (
	"context"
	"math"
	"log"
	"github.com/kamilmucik/question-svc/pkg/db"
	"github.com/kamilmucik/question-svc/pkg/model"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
	"net/http"
)

type QuestServer struct {
	H db.Handler
}

func (s *QuestServer) FindAllQuestions(ctx context.Context, req *pb.FindAllQuestionsRequest) (*pb.FindAllQuestionsResponse, error) {
	var questions []model.Question
	var list []*pb.FindQuestionData

	rows, err := s.H.DB.Model(&model.Question{}).Preload("Answers").Find(&questions).Limit(8).Rows()
	if err != nil {
		return &pb.FindAllQuestionsResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	for _, question := range questions {
		fd := pb.FindQuestionData{Code: question.Number, Question: question.Question}
		for _, answer := range question.Answers {
			fa := pb.FindAnswerData{Answer: answer.Answer, Correct: answer.Correct}
			fd.Answers = append(fd.Answers, &fa)
		}
		list = append(list, &fd)
	}

	defer rows.Close()

	return &pb.FindAllQuestionsResponse{
		Status: http.StatusOK,
		Data:   list,
	}, nil
}

func (s *QuestServer) FindPaggedQuestions(ctx context.Context, req *pb.FindPaggedQuestionsRequest) (*pb.FindPaggedQuestionsResponse, error) {
	var questions []model.Question
	var list []*pb.FindQuestionData
	var totalRows int64 = 0

	// log.Printf("category.FindPaggedQuestions: %s", req)
	// log.Printf("CategoryId: %d ", req.CategoryId)

    s.H.DB.Model(questions).Where("category_id = ?", req.CategoryId).Count(&totalRows)
	totalPages := int64(math.Ceil(float64(totalRows) / float64(req.PageSize)))  

	rows, err := s.H.DB.Model(&model.Question{}).Scopes(newPaginate(int(req.PageSize),int(req.CurrentPage)).paginatedResult).Preload("Answers").Where("category_id = ?", req.CategoryId).Find(&questions).Rows()
	if err != nil {
		return &pb.FindPaggedQuestionsResponse{
			Status: http.StatusNotFound,
			Error:  err.Error(),
		}, nil
	}

	defer rows.Close()
	for _, question := range questions {
		fd := pb.FindQuestionData{Id: question.Id, Code: question.Number, Question: question.Question}
		for _, answer := range question.Answers {
			fa := pb.FindAnswerData{Answer: answer.Answer, Correct: answer.Correct, Id: answer.Id}
			fd.Answers = append(fd.Answers, &fa)
		}
		list = append(list, &fd)
	}

	return &pb.FindPaggedQuestionsResponse{
		Status: http.StatusOK,
		TotalPage: totalPages,
		Data:   list,
	}, nil
}
