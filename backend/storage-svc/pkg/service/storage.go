package service

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/kamilmucik/storage-svc/pkg/config"
	pb "github.com/kamilmucik/storage-svc/pkg/pb"
)

type Server struct {
}

/**
 * info https://medium.com/@22vinikaanthwal/upload-and-retrieve-files-using-golang-gin-1d9a49e05089
 * @description: Zapisuje plik na dysku i zwraca ścieżkę do pobrania
 * @param {context.Context} ctx
 * @param {*pb.UploadRequest} req
 * @return {*pb.UploadResponse}
 * @return {error}
 */
func (s *Server) Upload(ctx context.Context, req *pb.UploadRequest) (*pb.UploadResponse, error) {
	// var profile model.Profile

	// log.Printf("storage.Upload: %s %s %s", req.UserId, req.Filename, len(req.File))
	c, err := config.LoadConfig()
	if err != nil {
		return nil, fmt.Errorf("failed to load config: %w", err)
	}

	uploadDir := filepath.Join(c.UploadDir, fmt.Sprintf("%d", req.UserId))
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create upload dir: %w", err)
	}

	filePath := filepath.Join(uploadDir, req.Filename+req.FileExtention) // Upewnij się, że folder istnieje

	// W funkcji Upload, po określeniu filePath:
	if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
		return &pb.UploadResponse{
			Status: http.StatusNotAcceptable,
			Error:  fmt.Sprintf("failed to remove existing file: %w", err), // Ścieżka do pobrania pliku
		}, nil
	}

	// W Twojej funkcji Upload, przed os.WriteFile:
	if _, err := os.Stat(filePath); err == nil {
		// Plik istnieje – nie nadpisuj lub zwróć błąd
		// return nil, fmt.Errorf("file already exists: %s", filePath)
		return &pb.UploadResponse{
			Status: http.StatusNotAcceptable,
			Error:  fmt.Sprintf("file already exists: %s", filePath), // Ścieżka do pobrania pliku
		}, nil
	} else if !os.IsNotExist(err) {
		// Inny błąd (np. brak uprawnień)
		// return nil, fmt.Errorf("failed to check file: %w", err)
		return &pb.UploadResponse{
			Status: http.StatusNotAcceptable,
			Error:  fmt.Sprintf("failed to check file: %w", err), // Ścieżka do pobrania pliku
		}, nil
	}

	// Zapisz bajty jako plik
	errIO := os.WriteFile(filePath, req.File, 0644) // 0644 = rw-r--r--
	if errIO != nil {
		return nil, fmt.Errorf("failed to save file: %w", err)
	}

	return &pb.UploadResponse{
		Status:  http.StatusOK,
		UrlPath: fmt.Sprintf("%s/%d/%s", c.UploadDir, req.UserId, req.Filename+req.FileExtention), // Ścieżka do pobrania pliku
	}, nil
}

func (s *Server) FindOne(ctx context.Context, req *pb.FindOneRequest) (*pb.FindOneResponse, error) {

	log.Printf("storage.FindOne: %d %s", req.UserId, req.Url)
	// log.Printf("storage.Upload: %s %s %s", req.UserId, req.Filename, len(req.File))
	c, err := config.LoadConfig()
	if err != nil {
		return nil, fmt.Errorf("failed to load config: %w", err)
	}

	filePath := filepath.Join(c.UploadDir, fmt.Sprintf("%d/%s.jpg", req.UserId, req.Url)) // Upewnij się, że folder istnieje

	openedFile, err := os.Open(filePath)
	if err != nil {
		// ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		// return
		log.Printf("Failed to open file: %s %s", req.UserId, filePath)
	}
	defer openedFile.Close()
	// Read the first 512 bytes of the file to determine its content type
	fileHeader := make([]byte, 512)
	_, err = openedFile.Read(fileHeader)
	if err != nil {
		// ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
		// return
		log.Printf("Failed to read file: %s %s", req.UserId, filePath)
	}
	fileContentType := http.DetectContentType(fileHeader)
	// Get the file info
	// fileInfo, err := fileData.Stat()
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file info"})
	// 	return
	// }
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		// ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read file"})
		// return
		log.Printf("failed to read file: %s %s", req.UserId, filePath)
	}
	// Get the file info
	fileInfo, err := openedFile.Stat()
	if err != nil {
		// ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file info"})
		// return

		log.Printf("Failed to get file info: %s %s", req.UserId, filePath)
	}

	// datatmp, err := os.ReadFile("/opt/app/uploads/12/avatar.jpg")
	// if err != nil { /* obsługa błędu */
	// }

	log.Printf("storage.FindOne: %s %s %s", req.UserId, filePath, fileInfo.Size())

	return &pb.FindOneResponse{
		Status:          http.StatusOK,
		File:            fileData,
		FileName:        fmt.Sprintf("%s.jpg", req.Url),
		FileSize:        fileInfo.Size(),
		FileContentType: fileContentType,
	}, nil
}
