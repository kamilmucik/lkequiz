DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
    id SERIAL,
    user_id INTEGER,
    fullname TEXT NOT NULL,
    username TEXT NOT NULL,
    profile_image_url TEXT NOT NULL,
    onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
