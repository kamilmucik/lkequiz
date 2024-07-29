package model

import "fmt"

type Question struct {
	Id         int64     `json:"id" gorm:"primaryKey,column:id"`
	Number     string    `json:"number" gorm:"column:number"`
	Question   string    `json:"question_val" gorm:"column:question_val"`
	CategoryId int64     `json:"category_id"`
	Answers    []*Answer `json:"answers" gorm:"ForeignKey:QuestionID"`
}

func (question Question) TableName() string {
	return "questions"
}

func (question Question) ToString() string {
	return fmt.Sprintf("id: %d\nnumber: %s\nquestion: %s", question.Id, question.Number, question.Question)
}
