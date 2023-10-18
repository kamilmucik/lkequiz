package department

import (
	"fmt"

	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/department/pb"
	"google.golang.org/grpc"
)

type ServiceClient struct {
	Client pb.DepartmentServiceClient
}

func InitServiceClient(c *config.Config) pb.DepartmentServiceClient {
	// using WithInsecure() because no SSL running
	cc, err := grpc.Dial(c.DepartmentSvcUrl, grpc.WithInsecure())

	if err != nil {
		fmt.Println("Could not connect:", err)
	}

	return pb.NewDepartmentServiceClient(cc)
}
