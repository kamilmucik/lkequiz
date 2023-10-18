package model

type Department struct {
	Id   int64  `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
}

func (Department) TableName() string {
	return "lke_departments"
}
