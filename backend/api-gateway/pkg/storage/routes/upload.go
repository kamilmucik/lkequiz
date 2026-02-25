package routes

import (
	"context"
	"io"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/kamilmucik/api-gateway/pkg/storage/pb"
)

type UploadRequestBody struct {
	File []byte `json:"file"`
}

// https://medium.com/@22vinikaanthwal/upload-and-retrieve-files-using-golang-gin-1d9a49e05089
func Upload(ctx *gin.Context, c pb.StorageServiceClient) {
	// body := UploadRequestBody{}
	v := ctx.Request.Context().Value("userId")
	if v != nil {
		if userId, ok := v.(int64); ok {

			// Get the file from the form data
			file, err := ctx.FormFile("file")
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			// Pobierz rozszerzenie
			extension := filepath.Ext(file.Filename) // np. ".pdf", ".jpg"
			if extension == "" {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "file must have an extension"})
				return
			}
			// Pobierz userId z formularza
			fileNameStr := ctx.PostForm("filename")
			if fileNameStr == "" {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "filename is required"})
				return
			}
			// userIdStr := ctx.PostForm("userId")
			// if userIdStr == "" {
			// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "userId is required"})
			// 	return
			// }
			// userId, err := strconv.ParseInt(userIdStr, 10, 64)
			// if err != nil {
			// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid userId"})
			// 	return
			// }
			// Otwórz plik i przeczytaj zawartość do []byte
			openedFile, err := file.Open()
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to open file"})
				return
			}
			defer openedFile.Close()

			fileData, err := io.ReadAll(openedFile)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read file"})
				return
			}

			// Wywołaj gRPC z bajtami pliku
			res, err := c.Upload(context.Background(), &pb.UploadRequest{
				UserId:        userId,
				File:          fileData, // Tutaj przekazujesz []byte
				Filename:      fileNameStr,
				FileExtention: extension,
			})
			if err != nil {
				ctx.AbortWithError(http.StatusBadGateway, err)
				return
			}

			ctx.JSON(http.StatusOK, &res)

		}
	} else {
		ctx.JSON(http.StatusBadRequest, "nie ma user ID")
	}

}
