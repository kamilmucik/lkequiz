package model

import "fmt"

type Answer struct {
	Id         int64  `json:"id" gorm:"primaryKey"`
	Answer     string `json:"answer"`
	Correct    string `json:"correct"`
	QuestionID int64  `json:"question_id" gorm:"column:question_id"`
	Question   Question
}

func (answer Answer) TableName() string {
	return "lke_answers"
}

func (answer Answer) ToString() string {
	return fmt.Sprintf("id: %d\nanswer: %s\ncorrect: %s", answer.Id, answer.Answer, answer.Correct)
}
