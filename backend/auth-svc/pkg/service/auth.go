package service

import (
	"context"
	"log"
	"net/http"

	"github.com/kamilmucik/auth-svc/pkg/db"
	"github.com/kamilmucik/auth-svc/pkg/model"
	"github.com/kamilmucik/auth-svc/pkg/pb"
	"github.com/kamilmucik/auth-svc/pkg/utils"
)

type Server struct {
	H   db.Handler
	Jwt utils.JwtWrapper
}

func (s *Server) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	log.Printf("Register: %s", req)
	var user model.User

	if result := s.H.DB.Where(&model.User{Email: req.Email}).First(&user); result.Error == nil {
		return &pb.RegisterResponse{
			Status: http.StatusConflict,
			Error:  "E-Mail already exists",
		}, nil
	}

	user.Email = req.Email
	user.Password = utils.HashPassword(req.Password)

	s.H.DB.Create(&user)

	token, _ := s.Jwt.GenerateToken(user)

	return &pb.RegisterResponse{
		Status: http.StatusCreated,

		Session: &pb.SessionResponse{
			AccessToken:  token,
			RefreshToken: token,
			ExpiresIn:    s.Jwt.ExpirationHours * 3600,
		},
		User: &pb.LoginUserDataResponse{
			Id: user.Id,
		},
	}, nil
}

func (s *Server) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	log.Printf("Login: %s", req)
	var user model.User

	// log.Printf("req.Email %s\n", req.Email)
	result := s.H.DB.Where(&model.User{Email: req.Email}).First(&user)
	if result.Error != nil {
		return &pb.LoginResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	match := utils.CheckPasswordHash(req.Password, user.Password)

	if !match {
		return &pb.LoginResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	token, _ := s.Jwt.GenerateToken(user)

	return &pb.LoginResponse{
		Status: http.StatusOK,
		Session: &pb.SessionResponse{
			AccessToken:  token,
			RefreshToken: token,
			ExpiresIn:    s.Jwt.ExpirationHours * 3600,
		},
		User: &pb.LoginUserDataResponse{
			Id:    user.Id,
			Email: user.Email,
		},
	}, nil
}

func (s *Server) Validate(ctx context.Context, req *pb.ValidateRequest) (*pb.ValidateResponse, error) {
	// log.Printf("Validate: %s", req)
	claims, err := s.Jwt.ValidateToken(req.Token)

	if err != nil {
		return &pb.ValidateResponse{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		}, nil
	}

	var user model.User

	if result := s.H.DB.Where(&model.User{Email: claims.Email}).First(&user); result.Error != nil {
		return &pb.ValidateResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	return &pb.ValidateResponse{
		Status: http.StatusOK,
		UserId: user.Id,
	}, nil
}

func (s *Server) UserInfo(ctx context.Context, req *pb.UserInfoRequest) (*pb.UserInfoResponse, error) {

	log.Printf("auth.UserInfo: %s", req)

	var user model.User

	if result := s.H.DB.Where(&model.User{Id: req.UserId}).First(&user); result.Error != nil {
		return &pb.UserInfoResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
			User:   nil,
		}, nil
	}

	return &pb.UserInfoResponse{
		Status: http.StatusOK,
		User: &pb.LoginUserDataResponse{
			Id:    user.Id,
			Email: user.Email,
		},
	}, nil
}

func (s *Server) PasswordRestore(ctx context.Context, req *pb.PasswordRestoreRequest) (*pb.PasswordRestoreResponse, error) {
	var user model.User

	if result := s.H.DB.Where(&model.User{Email: req.Email}).First(&user); result.Error != nil {
		return &pb.PasswordRestoreResponse{
			Status: http.StatusNotFound,
			Error:  "User not found",
		}, nil
	}

	return &pb.PasswordRestoreResponse{
		Status: http.StatusOK,
	}, nil
}
