DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);