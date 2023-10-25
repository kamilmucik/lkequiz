package service

import (
	gorm "gorm.io/gorm"
)

type paginate struct {
   limit int
   page  int
}

func newPaginate(limit int, page int) *paginate {
   return &paginate{limit: limit, page: page}
}

func (p *paginate) paginatedResult(db *gorm.DB) *gorm.DB {
   offset := (p.page - 1) * p.limit

   return db.Offset(offset).
      Limit(p.limit)
}