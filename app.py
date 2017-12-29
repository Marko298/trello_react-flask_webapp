from flask import Flask, render_template, request, session
from server.models.users.user import User
import server.models.users.errors as UserErrors
from server.common.database import Database

app = Flask(__name__,  template_folder="static/")
app.secret_key = "secretkey"

@app.before_first_request
def init_db():
    Database.initialize()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/users/register", methods=["POST", "GET"])
def user_register():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']

        try:
            if User.register_user(email, password, name):
                session['email'] = email
                return "registration is success"
        except UserErrors.UserError as e:
            return "registr. is failed with error {}".format(e)

    return "Registration form"


@app.route("/users/login", methods=["POST", "GET"])
def user_login():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']

        try:
            if User.is_login_valid(email, password):
                session['email'] = email
                return "ligon is success with email {}".format(session['email'])
        except UserErrors.UserError as e:
            return "login. is failed with error {}".format(e)

    return "login form"
    
    

if __name__ == '__main__':
    app.run(port=4000, debug=True)