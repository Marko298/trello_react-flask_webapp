from flask import Flask, render_template, request, session, json, jsonify

### Database
from server.common.database import Database

### User
from server.models.users.user import User
import server.models.users.errors as UserErrors
import server.models.users.decorators as user_dec

### Borad
from server.models.boards.board import Board

### Team 
from server.models.teams.team import Team
import server.models.teams.errors as TeamError


############ FLask App  ############

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
@user_dec.login_required   
def user_logout():
    session['email'] = None
    return jsonify(data={'user': "success logout"})

##########################
############### BOARDS API
##########################

@app.route("/boards", methods=["GET"])
@user_dec.login_required
def get_all_boards():
    boardsCur = User.get_own_boards(session['email'])
    return jsonify(boardsCur)


@app.route("/boards/<string:boardId>", methods=["GET"])
def get_board_by_id(boardId):
    _, board = Board.get_board(boardId)
    return jsonify(board)


@app.route("/boards/add_board/<string:teamId>", methods=["POST", "GET"])
@user_dec.login_required
def assign_board_to_team(teamId):
    if request.method == "POST" and request.is_json:
        CONTENT = request.get_json()
        
        user = User.get_user_by_email(session['email'])
        authorId = user.get("_id")
        userName = user.get("name")

        boardName = CONTENT['boardName']


        if teamId == authorId:
            reletedTo = {
                "teamId" : authorId,
                "teamName": userName
            }
            user = User.get_user_by_id(authorId)
            boardId = Board(boardName=boardName, authorId=authorId, reletedTo=reletedTo).save()
            user.assign_board(boardId)

        else:
            reletedTo = {
                "teamId" : teamId,
                "teamName": teamCursor.get("teamName")
            }
            teamClass, teamCursor = Team.get_team_by_id(teamId)
            boardId = Board(boardName=boardName, authorId=authorId, reletedTo=reletedTo).save()
            teamClass.assign_board(boardId)

        _, board = Board.get_board(boardId)
        
        return jsonify(board)


##########################
############### Teams API
##########################

@app.route("/team/create_team", methods=["POST", "GET"])
@user_dec.login_required
def create_team():
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        teamName = CONTENT['teamName']
        boards = CONTENT['boards'] if CONTENT.get('boards') is not None else None
        
        authorId = User.get_user_by_email(session['email']).get("_id")

        team = Team(teamName=teamName, authorId=authorId, boards=boards).create_team()

        return jsonify(team)

@app.route("/teams")
@user_dec.login_required
def get_all_teams():
    authorId = User.get_user_by_email(session['email']).get("_id")
    try:
        teams = Team.get_tems_by_author(authorId)
        return jsonify(teams)
    except TeamError.TeamError as e:
        return jsonify(error=e)
        


if __name__ == '__main__':
    app.run(port=4000, debug=True)