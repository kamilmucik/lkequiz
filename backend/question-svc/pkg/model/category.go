package model

type Category struct {
	Id    int64  `json:"id" gorm:"primaryKey"`
	DepartmentId int64  `json:"department_id"`
	Name  string `json:"name"`
	Code  string `json:"code"`
	OwnId int64  `json:"own_id"`
}

func (Category) TableName() string {
	return "lke_categories"
}
