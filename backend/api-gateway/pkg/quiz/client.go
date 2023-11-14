package quiz

import (
	"fmt"

	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/quiz/pb"
	"google.golang.org/grpc"
)

type ServiceClient struct {
	Client pb.QuizServiceClient
}

func InitServiceClient(c *config.Config) pb.QuizServiceClient {
	// using WithInsecure() because no SSL running
	cc, err := grpc.Dial(c.DepartmentSvcUrl, grpc.WithInsecure())

	if err != nil {
		fmt.Println("Could not connect:", err)
	}

	return pb.NewQuizServiceClient(cc)
}