CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    profile_pic TEXT,
    registered_at TIMESTAMPTZ DEFAULT now(),
    about TEXT,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs(
    id SERIAL PRIMARY KEY,
    author_id INT,
    content text NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    slug TEXT,
    title TEXT NOT NULL,
    CONSTRAINT fk_author_id
        FOREIGN KEY(author_id)
            REFERENCES users(id)
);