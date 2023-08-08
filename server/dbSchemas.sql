CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(30) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL,
  userid VARCHAR NOT NULL UNIQUE
) 

INSERT INTO users(email,passhash) values($1,$2)