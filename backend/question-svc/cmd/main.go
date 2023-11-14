package main

import (
	"fmt"
	"log"
	"net"

	"github.com/kamilmucik/question-svc/pkg/config"
	"github.com/kamilmucik/question-svc/pkg/db"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
	services "github.com/kamilmucik/question-svc/pkg/service"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	h := db.Init(c.DBUrl)

	lis, err := net.Listen("tcp", c.Port)

	if err != nil {
		log.Fatalln("Failed to listing:", err)
	}

	fmt.Println("Department Svc on", c.Port)

	s := services.Server{
		H: h,
	}
	cat := services.CatServer{
		H: h,
	}
	quest := services.QuestServer{
		H: h,
	}
	quiz := services.QuizServer{
		H: h,
	}

	grpcServer := grpc.NewServer()

	pb.RegisterDepartmentServiceServer(grpcServer, &s)
	pb.RegisterCategoryServiceServer(grpcServer, &cat)
	pb.RegisterQuestionServiceServer(grpcServer, &quest)
	pb.RegisterQuizServiceServer(grpcServer, &quiz)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
