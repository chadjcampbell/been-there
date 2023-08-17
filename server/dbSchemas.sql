CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(40) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL,
  photo_url VARCHAR NOT NULL DEFAULT 'https://img.freepik.com/free-icon/user_318-159711.jpg?t=st=0~exp=0~hmac=7ec3ecd49f9d99da3d2907db79b3d1abfcae7d393cdd51ab28bbab45dcc51596',
  bio VARCHAR NOT NULL DEFAULT 'Add your bio here to tell people who you are and where you''ve been...',
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 

CREATE TABLE friends (
    friendship_id INT PRIMARY KEY,
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    FOREIGN KEY (user_id_1) REFERENCES Users(user_id),
    FOREIGN KEY (user_id_2) REFERENCES Users(user_id),
    UNIQUE (user_id_1, user_id_2)
);

CREATE TABLE tokens(
  user_id INT NOT NULL PRIMARY KEY,
  token VARCHAR NOT NULL,
  created_at INT NOT NULL,
  expires_at INT NOT NULL
) 