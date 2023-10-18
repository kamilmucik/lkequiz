package model

type Category struct {
	Id    int64  `json:"id" gorm:"primaryKey"`
	DepId int64  `json:"department_id"`
	Name  string `json:"name"`
	Code  string `json:"code"`
}

func (Category) TableName() string {
	return "lke_categories"
}
