DROP TABLE IF EXISTS users;

CREATE TABLE users(
    loginName varchar(10) NOT NULL,
    userFirst varchar(50),
    userLast varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
PRIMARY KEY(loginName)
);

INSERT INTO users
(loginName, userFirst, userLast, email)
VALUES
('admin1', 'Desktop', 'Admin', 'desktopadmin@gmail.com');
