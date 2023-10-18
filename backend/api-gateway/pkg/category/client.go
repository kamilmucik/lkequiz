package category

import (
	"fmt"

	"github.com/kamilmucik/api-gateway/pkg/category/pb"
	"github.com/kamilmucik/api-gateway/pkg/config"
	"google.golang.org/grpc"
)

type ServiceClient struct {
	Client pb.CategoryServiceClient
}

func InitServiceClient(c *config.Config) pb.CategoryServiceClient {
	// using WithInsecure() because no SSL running
	cc, err := grpc.Dial(c.DepartmentSvcUrl, grpc.WithInsecure())

	if err != nil {
		fmt.Println("Could not connect:", err)
	}

	return pb.NewCategoryServiceClient(cc)
}
