from flask import Flask, render_template, request, session, json, jsonify

### Database
from server.common.database import Database

### User
from server.models.users.user import User
import server.models.users.errors as UserErrors
import server.models.users.decorators as user_dec

### Borad
from server.models.boards.board import Board
import server.models.boards.errors as BoardError

### Team 
from server.models.teams.team import Team
import server.models.teams.errors as TeamError

### List
from server.models.lists.list import List
import server.models.lists.errors as ListErrors

## Card
from server.models.cards.card import Card

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
                return jsonify(user)

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
            teamClass, teamCursor = Team.get_team_by_id(teamId)
            reletedTo = {
                "teamId" : teamId,
                "teamName": teamCursor.get("teamName")
            }
            boardId = Board(boardName=boardName, authorId=authorId, reletedTo=reletedTo).save()
            teamClass.assign_board(boardId)

        _, board = Board.get_board(boardId)
        
        return jsonify(board)


@app.route('/boards/remove_board/<string:boardId>', methods=["DELETE"])
@user_dec.login_required
def remove_board(boardId):
    if request.method == 'DELETE':
        
        try:
            Board.remove_board(boardId, Team.remove_board)
            return jsonify(boardId)

        except BoardError.BoardError as error:
            return jsonify(error=error.message)
        return "Done"
    
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
        

##########################
############### Lists API
##########################

@app.route('/list/create_list_for_board/<string:boardId>', methods=["POST"])
@user_dec.login_required
def create_list(boardId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        title = CONTENT.get('title') 
        forBoard = CONTENT.get('forBoard') if CONTENT.get('forBoard') is not None else None
        _id = CONTENT.get('_id') if CONTENT.get('_id') is not None else None

        try:
            classBoard, cursorBoard = Board.get_board(boardId)
        except BoardError.BoardError as error:
            return jsonify(error=error.message)

        if isinstance(classBoard, Board) and boardId == forBoard:
            listId = List(title=title, forBoard=forBoard, _id=_id).save()
            classBoard.assign_list_to_board(listId)

            try:
                cursorList, _ = List.get_list_by_id(listId)
            except ListErrors.ListErrors as error:
                return jsonify(error=error.message)

        return jsonify(cursorList)

    
@app.route('/list/get_releted_lists/<string:boardId>', methods=["GET"])
@user_dec.login_required
def get_list(boardId):
    if request.method == 'GET':
        cursorLists, classLists = List.get_all_lists_releted_to_board(boardId)
        return jsonify(cursorLists)

  
@app.route('/list/list_schema', methods=['GET'])
def list_schema():
    listSchema = List.list_schema_for_client()
    return jsonify(listSchema)
    
        
##########################
############### Card API
##########################
@app.route('/card/create_card_for_list/<string:listId>', methods=['POST'])
@user_dec.login_required
def create_card(listId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        title = CONTENT.get('title')
        forList = CONTENT.get('forList') if CONTENT.get('forList') is not None else listId
        _id = CONTENT.get('_id') if CONTENT.get('_id') is not None else None
        boardId = CONTENT.get('boardId')

        try:
            _, classList = List.get_list_by_id(listId)
        except ListErrors.ListErrors as error:
            return jsonify(error=error.message)

        cardId = Card(
            title=title,
            forList=forList,
            _id=_id,
            boardId=boardId
        ).save()

        classList.save_card_for_list(listId)
        _, cursorCard = Card.get_card_by_id(cardId)
        return  jsonify(cursorCard)
        
@app.route('/card/update_card/<string:cardId>', methods=['POST'])
def update_card(cardId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        if len(CONTENT) is not 0:
            classCard, _ = Card.get_card_by_id(cardId)

            updatedFields = dict(filter(lambda pair: pair[0] is not'labels', CONTENT.items()))

            if CONTENT.get('labels') is not None:
                classCard.add_label(CONTENT.get('labels'))
            else:
                updatedCardId = classCard.update_card(updatedFields)
                
            _, updatedCardCursor = Card.get_card_by_id(cardId)

            return jsonify(updatedCardCursor)


@app.route('/card/get_all_cards/<string:boardId>')
def get_all_cards(boardId):
    cardsCursor =  Card.get_card_by_boardId(boardId)
    return jsonify(cardsCursor)

@app.route('/card/card_schema', methods=['GET'])
def card_schema():
    cardSchema = Card.card_schema_for_client()
    return jsonify(cardSchema)

if __name__ == '__main__':
    app.run(port=4000, debug=True)