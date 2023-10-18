// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: pkg/pb/department.proto

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	DepartmentService_FindOne_FullMethodName = "/department.DepartmentService/FindOne"
	DepartmentService_FindAll_FullMethodName = "/department.DepartmentService/FindAll"
)

// DepartmentServiceClient is the client API for DepartmentService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type DepartmentServiceClient interface {
	FindOne(ctx context.Context, in *FindOneRequest, opts ...grpc.CallOption) (*FindOneResponse, error)
	FindAll(ctx context.Context, in *FindAllRequest, opts ...grpc.CallOption) (*FindAllResponse, error)
}

type departmentServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewDepartmentServiceClient(cc grpc.ClientConnInterface) DepartmentServiceClient {
	return &departmentServiceClient{cc}
}

func (c *departmentServiceClient) FindOne(ctx context.Context, in *FindOneRequest, opts ...grpc.CallOption) (*FindOneResponse, error) {
	out := new(FindOneResponse)
	err := c.cc.Invoke(ctx, DepartmentService_FindOne_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *departmentServiceClient) FindAll(ctx context.Context, in *FindAllRequest, opts ...grpc.CallOption) (*FindAllResponse, error) {
	out := new(FindAllResponse)
	err := c.cc.Invoke(ctx, DepartmentService_FindAll_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// DepartmentServiceServer is the server API for DepartmentService service.
// All implementations should embed UnimplementedDepartmentServiceServer
// for forward compatibility
type DepartmentServiceServer interface {
	FindOne(context.Context, *FindOneRequest) (*FindOneResponse, error)
	FindAll(context.Context, *FindAllRequest) (*FindAllResponse, error)
}

// UnimplementedDepartmentServiceServer should be embedded to have forward compatible implementations.
type UnimplementedDepartmentServiceServer struct {
}

func (UnimplementedDepartmentServiceServer) FindOne(context.Context, *FindOneRequest) (*FindOneResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindOne not implemented")
}
func (UnimplementedDepartmentServiceServer) FindAll(context.Context, *FindAllRequest) (*FindAllResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindAll not implemented")
}

// UnsafeDepartmentServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to DepartmentServiceServer will
// result in compilation errors.
type UnsafeDepartmentServiceServer interface {
	mustEmbedUnimplementedDepartmentServiceServer()
}

func RegisterDepartmentServiceServer(s grpc.ServiceRegistrar, srv DepartmentServiceServer) {
	s.RegisterService(&DepartmentService_ServiceDesc, srv)
}

func _DepartmentService_FindOne_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindOneRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DepartmentServiceServer).FindOne(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: DepartmentService_FindOne_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DepartmentServiceServer).FindOne(ctx, req.(*FindOneRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _DepartmentService_FindAll_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindAllRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DepartmentServiceServer).FindAll(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: DepartmentService_FindAll_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DepartmentServiceServer).FindAll(ctx, req.(*FindAllRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// DepartmentService_ServiceDesc is the grpc.ServiceDesc for DepartmentService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var DepartmentService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "department.DepartmentService",
	HandlerType: (*DepartmentServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "FindOne",
			Handler:    _DepartmentService_FindOne_Handler,
		},
		{
			MethodName: "FindAll",
			Handler:    _DepartmentService_FindAll_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/pb/department.proto",
}
