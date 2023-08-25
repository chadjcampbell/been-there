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
    friendship_id SERIAL PRIMARY KEY,
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    FOREIGN KEY (user_id_1) REFERENCES users(user_id),
    FOREIGN KEY (user_id_2) REFERENCES users(user_id),
    UNIQUE (user_id_1, user_id_2)
);

CREATE TYPE request_status AS ENUM ('pending', 'accepted', 'rejected');

CREATE TABLE friend_requests (
    request_id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    status request_status NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

CREATE TABLE tokens(
  user_id INT NOT NULL PRIMARY KEY,
  token VARCHAR NOT NULL,
  created_at INT NOT NULL,
  expires_at INT NOT NULL
) 

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    post_photo_url VARCHAR(255),
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_location JSONB, 
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    comment_photo_url VARCHAR(255),
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);