package profile

import (
	"fmt"

	"github.com/kamilmucik/api-gateway/pkg/config"
	"github.com/kamilmucik/api-gateway/pkg/profile/pb"
	"google.golang.org/grpc"
)

type ServiceClient struct {
	Client pb.ProfileServiceClient
}

func InitServiceClient(c *config.Config) pb.ProfileServiceClient {
	// using WithInsecure() because no SSL running
	cc, err := grpc.Dial(c.ProfileSvcUrl, grpc.WithInsecure())

	if err != nil {
		fmt.Println("Could not connect:", err)
	}

	return pb.NewProfileServiceClient(cc)
}
