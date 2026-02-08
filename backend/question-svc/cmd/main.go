package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/kamilmucik/question-svc/pkg/config"
	"github.com/kamilmucik/question-svc/pkg/db"
	pb "github.com/kamilmucik/question-svc/pkg/pb"
	services "github.com/kamilmucik/question-svc/pkg/service"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	h := db.Init(c.DBUrl)

	go func() {
		http.Handle("/metrics", promhttp.Handler())
		http.HandleFunc("/health", handler)
		http.ListenAndServe(":8080", nil)
	}()
	fmt.Println("Question Svc HTTP on :8080")

	lis, err := net.Listen("tcp", c.Port)

	if err != nil {
		log.Fatalln("Failed to listing:", err)
	}

	fmt.Println("Question Svc on", c.Port)

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

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "healthly")
}
