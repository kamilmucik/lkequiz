package model

type Department struct {
	Id   int64  `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
	OwnId int64 `json:"own_id"`
}

func (Department) TableName() string {
	return "departments"
}
