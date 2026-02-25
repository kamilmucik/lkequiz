package main

import (
	"fmt"
	"log"
	"net"

	"github.com/kamilmucik/storage-svc/pkg/config"
	pb "github.com/kamilmucik/storage-svc/pkg/pb"
	services "github.com/kamilmucik/storage-svc/pkg/service"
	"google.golang.org/grpc"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	lis, err := net.Listen("tcp", c.Port)

	if err != nil {
		log.Fatalln("Failed to listing:", err)
	}

	fmt.Println("Storage Svc on", c.Port)

	s := services.Server{}

	grpcServer := grpc.NewServer()

	pb.RegisterStorageServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}
}
