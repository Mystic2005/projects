CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES (
  'luca',
  '$2y$10$4AZOC2pTfSPlRHAaO/dBlOt3vKvH.11aIaOq1sxrQAiaf3QLBC3ya'
);

CREATE TABLE counters (
    user_id TEXT UNIQUE NOT NULL REFERENCES users(username),
    value INTEGER DEFAULT 0
);

CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(username),
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);