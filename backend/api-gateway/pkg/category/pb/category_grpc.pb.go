// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: pkg/category/pb/category.proto

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
	CategoryService_FindOneCategory_FullMethodName      = "/category.CategoryService/FindOneCategory"
	CategoryService_FindAllCategories_FullMethodName    = "/category.CategoryService/FindAllCategories"
	CategoryService_FindPaggedCategories_FullMethodName = "/category.CategoryService/FindPaggedCategories"
)

// CategoryServiceClient is the client API for CategoryService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type CategoryServiceClient interface {
	FindOneCategory(ctx context.Context, in *FindOneCategoryRequest, opts ...grpc.CallOption) (*FindOneCategoryResponse, error)
	FindAllCategories(ctx context.Context, in *FindAllCategoriesRequest, opts ...grpc.CallOption) (*FindAllCategoriesResponse, error)
	FindPaggedCategories(ctx context.Context, in *FindPaggedCategoriesRequest, opts ...grpc.CallOption) (*FindPaggedCategoriesResponse, error)
}

type categoryServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewCategoryServiceClient(cc grpc.ClientConnInterface) CategoryServiceClient {
	return &categoryServiceClient{cc}
}

func (c *categoryServiceClient) FindOneCategory(ctx context.Context, in *FindOneCategoryRequest, opts ...grpc.CallOption) (*FindOneCategoryResponse, error) {
	out := new(FindOneCategoryResponse)
	err := c.cc.Invoke(ctx, CategoryService_FindOneCategory_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) FindAllCategories(ctx context.Context, in *FindAllCategoriesRequest, opts ...grpc.CallOption) (*FindAllCategoriesResponse, error) {
	out := new(FindAllCategoriesResponse)
	err := c.cc.Invoke(ctx, CategoryService_FindAllCategories_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) FindPaggedCategories(ctx context.Context, in *FindPaggedCategoriesRequest, opts ...grpc.CallOption) (*FindPaggedCategoriesResponse, error) {
	out := new(FindPaggedCategoriesResponse)
	err := c.cc.Invoke(ctx, CategoryService_FindPaggedCategories_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CategoryServiceServer is the server API for CategoryService service.
// All implementations should embed UnimplementedCategoryServiceServer
// for forward compatibility
type CategoryServiceServer interface {
	FindOneCategory(context.Context, *FindOneCategoryRequest) (*FindOneCategoryResponse, error)
	FindAllCategories(context.Context, *FindAllCategoriesRequest) (*FindAllCategoriesResponse, error)
	FindPaggedCategories(context.Context, *FindPaggedCategoriesRequest) (*FindPaggedCategoriesResponse, error)
}

// UnimplementedCategoryServiceServer should be embedded to have forward compatible implementations.
type UnimplementedCategoryServiceServer struct {
}

func (UnimplementedCategoryServiceServer) FindOneCategory(context.Context, *FindOneCategoryRequest) (*FindOneCategoryResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindOneCategory not implemented")
}
func (UnimplementedCategoryServiceServer) FindAllCategories(context.Context, *FindAllCategoriesRequest) (*FindAllCategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindAllCategories not implemented")
}
func (UnimplementedCategoryServiceServer) FindPaggedCategories(context.Context, *FindPaggedCategoriesRequest) (*FindPaggedCategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindPaggedCategories not implemented")
}

// UnsafeCategoryServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to CategoryServiceServer will
// result in compilation errors.
type UnsafeCategoryServiceServer interface {
	mustEmbedUnimplementedCategoryServiceServer()
}

func RegisterCategoryServiceServer(s grpc.ServiceRegistrar, srv CategoryServiceServer) {
	s.RegisterService(&CategoryService_ServiceDesc, srv)
}

func _CategoryService_FindOneCategory_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindOneCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).FindOneCategory(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: CategoryService_FindOneCategory_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).FindOneCategory(ctx, req.(*FindOneCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_FindAllCategories_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindAllCategoriesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).FindAllCategories(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: CategoryService_FindAllCategories_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).FindAllCategories(ctx, req.(*FindAllCategoriesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_FindPaggedCategories_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindPaggedCategoriesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).FindPaggedCategories(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: CategoryService_FindPaggedCategories_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).FindPaggedCategories(ctx, req.(*FindPaggedCategoriesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// CategoryService_ServiceDesc is the grpc.ServiceDesc for CategoryService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var CategoryService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "category.CategoryService",
	HandlerType: (*CategoryServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "FindOneCategory",
			Handler:    _CategoryService_FindOneCategory_Handler,
		},
		{
			MethodName: "FindAllCategories",
			Handler:    _CategoryService_FindAllCategories_Handler,
		},
		{
			MethodName: "FindPaggedCategories",
			Handler:    _CategoryService_FindPaggedCategories_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/category/pb/category.proto",
}
