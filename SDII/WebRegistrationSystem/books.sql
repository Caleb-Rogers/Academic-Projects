DROP TABLE IF EXISTS books;

CREATE TABLE books(
    bookId char(5) NOT NULL,
    title varchar(50) NOT NULL,
    authorFirst varchar(50),
    authorLast varchar(50),
    description varchar(100),
    available boolean,
PRIMARY KEY(bookId)
);

-- Example input --
INSERT INTO books
(bookID, title, authorFirst, authorLast, description, available)
VALUES
('20105', 'Flask Web Development', 'Miguel', 'Grinberg', 'Software Development II', True);
