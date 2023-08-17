CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(40) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL,
  photo VARCHAR NOT NULL DEFAULT 'https://img.freepik.com/free-icon/user_318-159711.jpg?t=st=0~exp=0~hmac=7ec3ecd49f9d99da3d2907db79b3d1abfcae7d393cdd51ab28bbab45dcc51596',
  bio VARCHAR NOT NULL DEFAULT 'Add your bio here to tell people who you are and where you''ve been...'
) 

CREATE TABLE tokens(
  id INT NOT NULL PRIMARY KEY,
  token VARCHAR NOT NULL,
  createdAt INT NOT NULL,
  expiresAt INT NOT NULL
) 