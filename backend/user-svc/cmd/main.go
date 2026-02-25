package main

import (
	"fmt"
	"log"
	"net"

	"github.com/kamilmucik/user-svc/pkg/config"
	"github.com/kamilmucik/user-svc/pkg/db"
	pb "github.com/kamilmucik/user-svc/pkg/pb"
	services "github.com/kamilmucik/user-svc/pkg/service"
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

	fmt.Println("User Svc on", c.Port)

	s := services.Server{
		H: h,
	}

	grpcServer := grpc.NewServer()

	pb.RegisterProfileServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
