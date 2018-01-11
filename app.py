from flask import Flask, render_template, request, session, json, jsonify
from server.models.users.user import User
import server.models.users.errors as UserErrors
from server.common.database import Database

from server.models.boards.board import Board


app = Flask(__name__,  template_folder="static/")


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

#### FOR TESTING PURPOSE
from flask_cors import CORS
CORS(app, supports_credentials=True)

@app.before_first_request
def init_db():
    Database.initialize()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/users/register", methods=["POST", "GET"])
def user_register():
    if request.method == "POST" and request.is_json:   
        CONTENT = request.get_json()

        email = CONTENT['email']
        password = CONTENT['password']
        name = CONTENT['name']

        try:
            isRegistered, user = User.register_user(email, password, name)
            if isRegistered:
                session['email'] = email
                return jsonify(data=user)

        except UserErrors.UserError as e:
            return jsonify(error=e.message)

    return "Registration form"


@app.route("/users/login", methods=["POST", "GET"])
def user_login():
    if request.method == "POST" and request.is_json:
        CONTENT = request.get_json()

        email = CONTENT['email']
        password = CONTENT['password']

        try:
            if User.is_login_valid(email, password):
                session['email'] = email
                user = User.get_user_by_email(email)
                print("/users/login session['email']", session['email'])
                return jsonify(user)

        except UserErrors.UserError as e:
            return jsonify(error=e.message)

    return "login form"
    
    
@app.route("/user/<string:userId>/create_board", methods=["POST", "GET"])
def user_create_board(userId):
    user = User.get_user_by_id(userId)
    if request.method == "POST" and request.is_json:
        CONTENT = request.get_json()

        boardName = CONTENT['boardName']
        reletedTo = None if 'reletedTo' not in CONTENT else CONTENT['reletedTo']

        try:
            isCreated, boardId = user.createBoard(boardName, reletedTo)
            if isCreated:
                _, createdBoard = Board.get_board(boardId)
                return jsonify(data=createdBoard)

        except UserErrors.UserError as e:
            return jsonify(error=e.message)
            
    return "Method GET is not allowed here :C "


@app.route('/user/<string:userId>/<string:boardId>/toggle_board_settings', methods=["GET", "POST"])
def toggle_board_settings(userId, boardId):
    
    user = User.get_user_by_id(userId)
    boardClass, _ = user.get_board(boardId)

    if request.method == "POST" and request.is_json:
        CONTENT = request.get_json()

        """ CHANGE REQUEST METHOD TO PUT """
        
        isImportant = CONTENT['isImportant']

        if boardClass.isImportant != isImportant:
            updatedBoard = boardClass.toggleBoardImportant(isImportant)
            return jsonify(data=updatedBoard)

        return jsonify(error="there is the same state")
    
    return "Success GET"
    
@app.route("/users/logout") 
def user_logout():
    if session['email'] is not None:
        session['email'] = None
        return jsonify(data={'user': "success logout"})

    return jsonify(error="You are not loggined")

##########################
############### BOARDS API
##########################
@app.route("/boards", methods=["GET"])
def get_all_boards():
    session['email'] = "silver.ranger911@gmail.com"
    if session['email'] is not None:
        boardsCur = User.get_own_boards(session['email'])
        return jsonify(boardsCur)
    
    return "You have to login, before you want to gett all boards"

@app.route("/boards/<string:boardId>", methods=["GET"])
def get_board_by_id(boardId):
    _, board = Board.get_board(boardId)
    return jsonify(board)

if __name__ == '__main__':
    app.run(port=4000, debug=True)