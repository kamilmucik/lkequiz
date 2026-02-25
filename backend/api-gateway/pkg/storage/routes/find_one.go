package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/storage/pb"
)

func FindOne(ctx *gin.Context, c pb.StorageServiceClient) {
	url_path := ctx.Param("url_path")

	log.Printf("storage.FindOne: %s", url_path)
	v := ctx.Request.Context().Value("userId")
	if v != nil {
		if userId, ok := v.(int64); ok {
			res, err := c.FindOne(context.Background(), &pb.FindOneRequest{
				UserId: userId,
				Url:    url_path,
			})

			if err != nil {
				ctx.AbortWithError(http.StatusBadGateway, err)
				return
			}
			// Set the headers for the file transfer and return the file
			ctx.Header("Content-Description", "File Transfer")
			ctx.Header("Content-Transfer-Encoding", "binary")
			// ctx.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", file.Filename))
			// ctx.Header("Content-Type", fileContentType)
			// ctx.Header("Content-Length", fmt.Sprintf("%d", fileInfo.Size()))
			ctx.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", res.FileName))
			ctx.Header("Content-Type", res.FileContentType)
			ctx.Header("Content-Length", fmt.Sprintf("%d", res.FileSize))
			// ctx.Writer.Write(res.File)
			// Zapisz bajty jako plik
			errIO := os.WriteFile("/tmp/"+res.FileName, res.File, 0644) // 0644 = rw-r--r--
			if errIO != nil {
				// return nil, fmt.Errorf("failed to save file: %w", err)
			}
			ctx.File("/tmp/" + res.FileName)

		}
	} else {
		ctx.JSON(http.StatusBadRequest, "nie ma user ID")
	}
}
