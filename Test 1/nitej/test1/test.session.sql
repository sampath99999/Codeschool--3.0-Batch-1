CREATE TABLE user_details(
    id SERIAL PRIMARY KEY ,
    first_name VARCHAR,
    last_name VARCHAR,
    phone VARCHAR,
    gender VARCHAR,
    email VARCHAR,
    password VARCHAR,
    user_type VARCHAR,
    token VARCHAR
)
DROP TABLE user_details;
INSERT INTO user_details (first_name, last_name, phone, gender, email, password, user_type)
VALUES ('nitej', 'keshetty', '8374621080', 'male', 'nitejkeshetty@gmail.com', 'Nitej@123', 'admin');
UPDATE user_details SET token = "10b8e822d03fb4fd946188e852a4c3e2" WHERE user_type="admin";