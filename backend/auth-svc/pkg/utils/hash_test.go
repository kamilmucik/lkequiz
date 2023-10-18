package utils

import (
    "testing"

    "golang.org/x/crypto/bcrypt"
)

func TestHashPassword(t *testing.T) {
    password := "myPassword"
    hash := HashPassword(password)

    if len(hash) == 0 {
        t.Errorf("HashPassword() returned an empty string")
    }
}

func TestCheckPasswordHash(t *testing.T) {
    password := "myPassword"
    hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

    if !CheckPasswordHash(password, string(hash)) {
        t.Errorf("CheckPasswordHash() returned false, expected true")
    }
}

func TestCheckPasswordHashInvalid(t *testing.T) {
    password := "myPassword"
    hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

    if CheckPasswordHash("wrongPassword", string(hash)) {
        t.Errorf("CheckPasswordHash() returned true, expected false")
    }
}

func TestCheckPasswordHashInvalidHash(t *testing.T) {
    if CheckPasswordHash("myPassword", "invalidHash") {
        t.Errorf("CheckPasswordHash() returned true, expected false")
    }
}