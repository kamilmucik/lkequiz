package question

import (
	"fmt"

	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/question/pb"
	"google.golang.org/grpc"
)

type ServiceClient struct {
	Client pb.QuestionServiceClient
}

func InitServiceClient(c *config.Config) pb.QuestionServiceClient {
	// using WithInsecure() because no SSL running
	cc, err := grpc.Dial(c.DepartmentSvcUrl, grpc.WithInsecure())

	if err != nil {
		fmt.Println("Could not connect:", err)
	}

	return pb.NewQuestionServiceClient(cc)
}
