DROP TABLE IF EXISTS loans;

CREATE TABLE loans(
    bookId char(5),
    loginName varchar(10),
    loanCheckout date,
    loanExpiration date,
PRIMARY KEY(bookId, loginName)
);
