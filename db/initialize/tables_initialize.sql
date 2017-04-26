CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255) UNIQUE,
  password varchar(255)
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  author varchar(255), -- TODO Make this automatically fill in with user
  imageUrl text,
  content text
);
