package model

type Profile struct {
	Id                  int64  `json:"id" gorm:"primaryKey"`
	UserID              int64  `json:"user_id" gorm:"column:user_id"`
	Fullname            string `json:"fullname"`
	Username            string `json:"username"`
	ProfileImageUrl     string `json:"profile_image_url"`
	OnboardingCompleted bool   `json:"onboarding_complete"`
}

func (Profile) TableName() string {
	return "profiles"
}
