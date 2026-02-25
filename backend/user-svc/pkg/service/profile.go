package service

import (
	"context"
	"net/http"

	"github.com/kamilmucik/user-svc/pkg/db"
	"github.com/kamilmucik/user-svc/pkg/model"
	pb "github.com/kamilmucik/user-svc/pkg/pb"
)

type Server struct {
	H db.Handler
}

func (s *Server) FindOne(ctx context.Context, req *pb.FindOneRequest) (*pb.FindOneResponse, error) {
	var profile model.Profile

	// log.Printf("profile.FindOne: %s", req)

	if result := s.H.DB.First(&profile, "user_id = ?", req.UserId); result.Error != nil {
		return &pb.FindOneResponse{
			Status: http.StatusNotFound,
			Error:  result.Error.Error(),
		}, nil
	}
	// log.Printf("profile.FindOne.profile: %s", profile.OnboardingCompleted)

	data := &pb.FindOneData{
		Id:                  profile.Id,
		Username:            profile.Username,
		Fullname:            profile.Fullname,
		ProfileImageUrl:     profile.ProfileImageUrl,
		OnboardingCompleted: profile.OnboardingCompleted,
	}

	// log.Printf("profile.FindOne.profile: %s", data)
	return &pb.FindOneResponse{
		Status: http.StatusOK,
		Data:   data,
	}, nil
}

func (s *Server) UpdateProfile(ctx context.Context, req *pb.UpdateProfileRequest) (*pb.UpdateProfileResponse, error) {
	var profile model.Profile

	// log.Printf("user.UpdateProfile: %s", req)

	if result := s.H.DB.Model(&profile).Where("user_id = ?", req.UserId).Updates(req); result.Error != nil {
		return &pb.UpdateProfileResponse{
			Status: http.StatusNotFound,
			Error:  result.Error.Error(),
		}, nil
	}

	return &pb.UpdateProfileResponse{
		Status: http.StatusOK,
	}, nil
}
