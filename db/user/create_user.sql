INSERT INTO helo_users (username, password)
VALUES (${username}, ${hash})

returning id, username;
