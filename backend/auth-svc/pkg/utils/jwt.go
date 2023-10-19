package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/kamilmucik/auth-svc/pkg/model"
)

type JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

type jwtClaims struct {
	jwt.StandardClaims
	Id    int64
	Email string
}

// GenerateToken generates a JWT token for the given user with the configured expiration time and issuer.
// The token is signed using the configured secret key.
// Returns the signed token string and an error if the signing process fails.
func (w *JwtWrapper) GenerateToken(user model.User) (signedToken string, err error) {
	// Create the JWT claims with the user ID, email, expiration time, and issuer.
    claims := &jwtClaims{
		Id:    user.Id,
		Email: user.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(w.ExpirationHours)).Unix(),
			Issuer:    w.Issuer,
		},
	}

	// Create a new JWT token with the claims and sign it using the secret key.
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err = token.SignedString([]byte(w.SecretKey))

	if err != nil {
		return "", err
	}

	return signedToken, nil
}

// ValidateToken validates a JWT token and returns its claims if the token is valid.
// The token is validated using the configured secret key and expiration time.
// Returns the token claims and an error if the token is invalid or has expired.
func (w *JwtWrapper) ValidateToken(signedToken string) (claims *jwtClaims, err error) {
    // Parse the JWT token with the configured claims type and secret key.
    token, err := jwt.ParseWithClaims(
        signedToken,
        &jwtClaims{},
        func(token *jwt.Token) (interface{}, error) {
            return []byte(w.SecretKey), nil
        },
    )

    if err != nil {
        return
    }

    // Extract the claims from the token and check if they are of the expected type.
    claims, ok := token.Claims.(*jwtClaims)

    if !ok {
        return nil, errors.New("Couldn't parse claims")
    }

    // Check if the token has expired by comparing its expiration time with the current time.
    if claims.ExpiresAt < time.Now().Local().Unix() {
        return nil, errors.New("JWT is expired")
    }

    return claims, nil
}
