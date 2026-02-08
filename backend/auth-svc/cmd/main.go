package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/kamilmucik/auth-svc/pkg/config"
	"github.com/kamilmucik/auth-svc/pkg/db"
	"github.com/kamilmucik/auth-svc/pkg/pb"
	"github.com/kamilmucik/auth-svc/pkg/service"
	"github.com/kamilmucik/auth-svc/pkg/utils"
	"google.golang.org/grpc"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	h := db.Init(c.DBUrl)

	jwt := utils.JwtWrapper{
		SecretKey:       c.JWTSecretKey,
		Issuer:          "auth-svc",
		ExpirationHours: 24 * 365,
	}

	go func() {
		http.Handle("/metrics", promhttp.Handler())
		http.HandleFunc("/health", handler)
		http.ListenAndServe(":8080", nil)
	}()
	fmt.Println("Auth Svc HTTP on :8080")

	lis, err := net.Listen("tcp", c.Port)

	if err != nil {
		log.Fatalln("Failed to listing:", err)
	}

	fmt.Println("Auth Svc gRPC on", c.Port)

	s := service.Server{
		H:   h,
		Jwt: jwt,
	}

	grpcServer := grpc.NewServer()

	pb.RegisterAuthServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalln("Failed to serve:", err)
	}

}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "healthly")
}
