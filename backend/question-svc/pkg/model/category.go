package model

type Category struct {
	Id    int64  `json:"id" gorm:"primaryKey"`
	DepartmentId int64  `json:"department_id"`
	Name  string `json:"name"`
	Code  string `json:"code"`
	OwnId int64  `json:"own_id"`
	TimeLimit int64  `json:"time_limit"`
	QuestionLimit int64  `json:"question_limit"`
	MaxQuestionLimit int64  `json:"max_question_limit"`
}

func (Category) TableName() string {
	return "categories"
}
