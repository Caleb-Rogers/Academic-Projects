import datetime
import pymysql
from flask import Flask, render_template, session, flash, url_for, redirect
from flask.globals import request
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, logout_user
from flask_login import LoginManager


app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Set-up DB connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://libloan:softdev2020@libloan.mysql.pythonanywhere-services.com:3306/libloan$registration'
db = SQLAlchemy(app)

 # Login set-up
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'index'
login_manager.login_message = 'You need to be authenticated to access this feature'

# SQLAlchemy class representaion for users
class users(db.Model):
    __tablename__='users'
    loginName = db.Column('loginName', db.String(10), primary_key=True)
    userFirst = db.Column('userFirst', db.String(50))
    userLast = db.Column('userLast', db.String(50))
    email = db.Column('email', db.String(50))
    authenticated = False

    def __init__(self, log, ufirst, ulast, mail):
        self.loginName = log
        self.userFirst = ufirst
        self.userLast = ulast
        self.email = mail
        self.authenticated = True

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.authenticated
    def is_active(self):
        """True, as all users are active."""
        return True
    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False
    def get_id(self):
        """Return the id to satisfy Flask-Login's requirements."""
        return self.loginName


# load_user() call back function
@login_manager.user_loader
def load_user(loginname):
    return users.query.filter(users.loginName == loginname).first()


# First screen where a user or admin logs in
@app.route('/')
def index():
    return render_template("roleSelect.html")


# User login screen
@app.route('/userlogin', methods=["GET", "POST"])
def user_login():
    if request.method == "GET":
        return render_template("userLogin.html")

    loginname = request.values["loginname"]
    password = request.values["loginpassword"]
    session['loginname'] = loginname
    user = users.query.filter(users.loginName == loginname).first()

    if user is None:
        flash("The entered user was not found in the database. Enter a valid login name or have an admin create a user")
        return render_template("userLogin.html")

    if password == 'userpassword' and loginname != 'admin1':
        session_duration = datetime.timedelta(seconds=300)
        app.permanent_session_lifetime = session_duration
        login_user(user)
        return render_template("userRegistration.html", loginname = loginname)

    else:
        flash("You entered an incorrect password. Please use the User's password")
        return render_template("userLogin.html")


# Admin login screen
@app.route('/adminlogin', methods=["GET", "POST"])
def admin_login():
    if request.method == "GET":
        return render_template("adminLogin.html")

    loginname = request.values["loginname"]
    password = request.values["loginpassword"]
    session['loginname'] = loginname
    user = users.query.filter(users.loginName == loginname).first()
    if user is None:
        flash("The admin entered was not found in the database. The deafult admin login name is 'admin1'.")
        return render_template("adminLogin.html")

    if password == 'adminpassword' and loginname == 'admin1':
        session_duration = datetime.timedelta(seconds=300)
        app.permanent_session_lifetime = session_duration
        login_user(user)
        return render_template("adminRegistration.html")
    else:
        flash("You entered an incorrect password. Please use the Admin's password")
        return render_template("adminLogin.html")


# Log out
@app.route('/logout', methods=["GET", "POST"])
def logout():
    session_duration = datetime.timedelta(seconds=0)
    app.permanent_session_lifetime = session_duration
    logout_user()
    flash('You have been logged out.')
    return render_template("roleSelect.html")


# Search books screen
@app.route('/search', methods=["get"])
def render_search_form():
    return render_template("search_books.html")


# Searches the database for any book with the last name of the author inputted
@app.route('/findbook', methods=["GET", "POST"])
def search():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        authorLN = request.form.get('authorname')
        dbcursor = dbConnection.cursor()
        search_query = "SELECT * from books where authorLast = %(authorLast)s"
        dbcursor.execute(search_query, {'authorLast':authorLN})
        result = dbcursor.fetchall()

        html_response_str = render_template("book_list.html", book_list = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Lists the books, and gives an option to type in a book id to borrow
@app.route("/borrow", methods=["get", "post"])
def borrow_books():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        dbcursor = dbConnection.cursor()
        sql_query = "SELECT * from books"
        dbcursor.execute(sql_query)
        result = dbcursor.fetchall()
        html_response_str = render_template("borrow_book.html", book_list = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Checks the book id that was inputted to see if it can be borrowed or not
@app.route("/checkavailable", methods=["get", "post"])
def check_available():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        book = request.form.get('bookid')
        dbcursor = dbConnection.cursor()
        availability_query = "SELECT available from books where bookId = %(bookId)s"
        dbcursor.execute(availability_query, {'bookId':book})
        result = dbcursor.fetchone()

        if result is None:
            flash("The entered book did not match any in the database. Enter a valid BookID.")
            return redirect(url_for("borrow_books"))

        else:
            result = int(result[0])

            if result == 1:
                todaysDate = datetime.datetime.today()
                expireDate = (datetime.datetime.today() + datetime.timedelta(30))
                loginname = session['loginname']

                insert_loans_query = "INSERT INTO loans(bookId, loginName, loanCheckout, loanExpiration) \
                                        Values(%s, %s, %s, %s);"
                dbcursor.execute(insert_loans_query, (book, loginname, todaysDate, expireDate))

                change_availability_query = "UPDATE books \
                                             SET available = False \
                                             WHERE bookId = %(bookId)s"
                dbcursor.execute(change_availability_query, {'bookId':book})

                dbConnection.commit()
                added_html_response_str = render_template("added_loan.html", book=book, loginname=loginname, todaysDate=todaysDate, expireDate=expireDate)

            else:
                select_query = "SELECT loanExpiration from loans where bookId = %(bookId)s"
                dbcursor.execute(select_query, {'bookId':book})
                result = dbcursor.fetchone()
                result = str(result[0])
                not_added_html_response_str = render_template("not_added_loan.html", expiration = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    if result == 1:
        return added_html_response_str
    else:
        return not_added_html_response_str


# Add book screen
@app.route('/addbook', methods=["get"])
def render_add_book_form():
    return render_template("add_book_form.html")


# Adds book into the database with the values inputted
@app.route("/addnewbook", methods=["post"])
def add_new_book():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        book = request.form.get('bookID')
        title = request.form.get('title')
        authorFN = request.form.get('authorFirst')
        authorLN = request.form.get('authorLast')
        desc = request.form.get('description')
        availability = request.form.get('available')

        dbcursor = dbConnection.cursor()
        exist_query = "SELECT bookID from books where bookId = %(bookId)s"
        dbcursor.execute(exist_query, {'bookId':book})
        result = dbcursor.fetchone()

        if result is not None:
            flash("The entered book already exists in the database")
            return redirect(url_for("render_add_book_form"))

        else:
            if availability == "True":
                aval = True
            else:
                aval = False

            dbcursor = dbConnection.cursor()
            insert_books_qry = "INSERT INTO books(bookID, title, authorFirst, authorLast, description, available) \
                               Values (%s, %s, %s, %s, %s, %s);"

            dbcursor.execute(insert_books_qry, (book, title, authorFN, authorLN, desc, aval))
            dbConnection.commit()

            html_response_str = render_template("added_book.html", book=book, title=title, authorFN=authorFN, authorLN=authorLN, desc=desc, aval=aval)
    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Lists all the books in the database
@app.route("/listbooks", methods=["get", "post"])
def list_books():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        dbcursor = dbConnection.cursor()
        sql_query = "SELECT * from books"
        dbcursor.execute(sql_query)
        result = dbcursor.fetchall()
        html_response_str = render_template("book_list.html", book_list = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Add user screen
@app.route('/adduser', methods=["get"])
def render_add_user_form():
    return render_template("add_user_form.html")


@app.route("/addnewuser", methods=["post"])
def add_new_user():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        loginName = request.form.get('loginName')
        userFirst = request.form.get('userFirst')
        userLast = request.form.get('userLast')
        email = request.form.get('email')

        dbcursor = dbConnection.cursor()
        exist_query = "SELECT loginName from users where loginName = %(loginName)s"
        dbcursor.execute(exist_query, {'loginName':loginName})
        result = dbcursor.fetchone()

        if result is not None:
            flash("The entered user already exists in the database")
            return redirect(url_for("render_add_user_form"))

        else:
            dbcursor = dbConnection.cursor()
            insert_user_qry = "INSERT INTO users(loginName, userFirst, userLast, email) \
                               Values (%s, %s, %s, %s);"

            dbcursor.execute(insert_user_qry, (loginName, userFirst, userLast, email))
            dbConnection.commit()

            html_response_str = render_template("added_user.html", loginName=loginName, userFirst=userFirst, userLast=userLast, email=email)
    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Lists all the users in the database
@app.route("/listusers", methods=["get", "post"])
def list_users():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        dbcursor = dbConnection.cursor()
        sql_query = "SELECT * from users"
        dbcursor.execute(sql_query)
        result = dbcursor.fetchall()
        html_response_str = render_template("user_list.html", user_list = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# Lists all the loans in the database
@app.route("/listloans", methods=["get", "post"])
def list_loans():
    dbConnection = getdbconnection(mysqlconnection)
    dbcursor = None
    try:
        dbcursor = dbConnection.cursor()
        sql_query = "SELECT * from loans"
        dbcursor.execute(sql_query)
        result = dbcursor.fetchall()
        html_response_str = render_template("loans_list.html", loans_list = result)

    finally:
        if dbcursor is not None:
            dbcursor.close()

    return html_response_str


# This method either returns a new connection for the first time it is called
# or checks whether the connection still works and makes another one if
# connetcion is lost.
def getdbconnection(con):
    if con is None or not con.open:
        con = pymysql.connect(user='libloan',
                              password='softdev2020',
                              host='libloan.mysql.pythonanywhere-services.com',
                              port=3306,
                              database='libloan$registration')

    return con

mysqlconnection = getdbconnection(None)


if __name__ == '__main__':
    app.run()
