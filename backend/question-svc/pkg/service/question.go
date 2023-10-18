package service

import (
	"context"
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
