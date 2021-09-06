-- CREATE TABLE helo_users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(200) NOT NULL,
--     password VARCHAR(200) NOT NULL,
--     profile_pic text
-- );

-- SELECT * FROM helo_users

-- CREATE TABLE helo_posts (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(45) NOT NULL,
--     content TEXT,
--     img TEXT,
--     author_id INTEGER REF (helo_users id),
--     date_created TIMESTAMP	
-- ) 

-- SELECT * FROM helo_posts