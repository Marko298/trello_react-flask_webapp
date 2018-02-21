from flask import Flask, render_template, request, session, jsonify
from server.common.utils import Utils
import json
from bson import ObjectId
import codecs
### Database
from server.common.database import Database, FS

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
import server.models.cards.errors as CardError

## Comment
from server.models.comments.comment import Comment

## CheckList
from server.models.checklist.checklist import Checklist


############ FLask App  ############

app = Flask(__name__,  template_folder="static/")


app.config['MONGO_DBNAME'] = 'trello'
app.config['MONGO_URI'] = 'mongodb://pavlo_kuzina:123123@ds245228.mlab.com:45228/trello'
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

#### FOR TESTING PURPOSE
# from flask_cors import CORS
# CORS(app, supports_credentials=True)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
# JSONEncoder().encode(updatedUser)
def loop_over(data):
    newDict = dict()
    for k, v in data.items():
        if v is not None:
            newDict[k] = v
    
    return newDict

def isHaveImage(team):
    if team['photo']:
        fsClass = FS.get(team['photo'])
        photo = Utils.prepareImage(fsClass)
        return {**team, 'photo': photo}
    return team
        
    # if isinstance(team['photo'], ObjectId):
    #     fsClass = FS.get(team['photo'])
    #     photo = Utils.prepareImage(fsClass)
    #     return {**team, 'photo': photo}
    # return team


@app.before_first_request
def init_db():
    Database.initialize(app)


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

                # if isinstance(user['photo'], ObjectId):
                    
                #     fsClass = FS.get(user['photo'])
                #     photo = Utils.prepareImage(fsClass)
                #     user['photo'] = photo

                #     return jsonify(user)

                if user['photo']:
                    fsClass = FS.get(user['photo'])
                    photo = Utils.prepareImage(fsClass)
                    user['photo'] = photo
                    

                return jsonify(user)

        except UserErrors.UserError as e:
            return jsonify(error=e.message)

    return "login form"
    

@app.route("/user/update_photo", methods=["POST", "GET"])
@user_dec.login_required 
def update_user_photo():
    if request.method == 'POST':

        image_file = request.files['photo']

        contentType = image_file.content_type
        fileName = image_file.filename

        user = User.get_user_by_email(session['email'])
        classUser = User(**user)

        isUploaded = classUser.upload_photo(image_file, contentType, fileName)
        fsCLass = FS.get(isUploaded)

        img_str = Utils.prepareImage(fsCLass)

        return jsonify(img_str)


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


@app.route('/users/get_by_ids', methods=['GET', 'POST'])
@user_dec.login_required 
def get_user_by_ids():
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        ids = CONTENT.get('user_ids')
        
        users = [User.get_user_by_id_cursor(id) for id in ids]
        userWithImage = [isHaveImage(user) for user in users]
        return jsonify(userWithImage)
        

@app.route("/users/logout") 
@user_dec.login_required   
def user_logout():
    session['email'] = None
    return jsonify(data={'user': "success logout"})


@app.route('/users/update', methods=['POST'])
@user_dec.login_required
def update_user():
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        userEmail = session['email']
        userCursor = User.get_user_by_email(userEmail)

        newData = loop_over(CONTENT)
        userClass = User(**userCursor)
        
        updatesForUser = userClass.update_user_info(newData)

        return jsonify(updatesForUser)


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
        styleSettings = CONTENT['styleSettings']


        if teamId == authorId:
            reletedTo = {
                "teamId" : authorId,
                "teamName": userName
            }

            user = User.get_user_by_id(authorId)
            boardId = Board(boardName=boardName, authorId=authorId, reletedTo=reletedTo, styleSettings=styleSettings).save()
            user.assign_board(boardId)

        else:
            teamClass, teamCursor = Team.get_team_by_id(teamId)
            reletedTo = {
                "teamId" : teamId,
                "teamName": teamCursor.get("teamName")
            }
            boardId = Board(boardName=boardName, authorId=authorId, reletedTo=reletedTo, styleSettings=styleSettings).save()
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

@app.route('/boards/update/<string:boardId>', methods=['POST'])
def update_board_data(boardId):
    if request.is_json:
        CONTENT = request.get_json()

        existingData = loop_over(CONTENT)
        try:
            classBoard, _ = Board.get_board(boardId)
            updates = classBoard.update(existingData)
            return jsonify(updates)
        except:
            return jsonify(error="Something go wrong")

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

@app.route('/team/upload_photo/<string:teamId>', methods=['POST'])
def upload_photo_for_team(teamId):
    image_file = request.files['photo']

    contentType = image_file.content_type
    fileName = image_file.filename

    teamClass, _ = Team.get_team_by_id(teamId)

    isUploaded = teamClass.upload_photo(image_file, contentType, fileName)
    fsCLass = FS.get(isUploaded)

    img_str = Utils.prepareImage(fsCLass)

    return jsonify(img_str)

    

@app.route('/team/update/<string:teamId>', methods=['POST'])
def update_team(teamId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()
        teamClass, _ = Team.get_team_by_id(teamId)
        
        newUpdates = loop_over(CONTENT)

        updates = teamClass.update_team(newUpdates)

        return jsonify(updates)
    



@app.route("/teams")
@user_dec.login_required
def get_all_teams():
    authorId = User.get_user_by_email(session['email']).get("_id")
    try:
        teams = Team.get_tems_by_author(authorId)
   
        data = list(map(isHaveImage, teams))
        return jsonify(data)

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

@app.route('/list/update/<string:listId>', methods=['POST'])
def update_list(listId):
    if request.is_json:
        CONTENT = request.get_json()

        _, classList = List.get_list_by_id(listId)
        
        data = loop_over(CONTENT)
        result = classList.update(data)

        return jsonify(result)
    
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
            
            attachments = CONTENT.get('attachments')


            if attachments is not None and attachments['assigned'] is not None:
                updatedCard = classCard.assign_attachment_file(attachments['assigned'])
                print ("WE GOT SOMETINH", attachments['assigned'])
                return jsonify(updatedCard)

            updatedFields = dict(
                filter(lambda pair: pair[0] is not 'labels', CONTENT.items())
            )

            if CONTENT.get('labels') is not None:
                classCard.add_label(CONTENT.get('labels'))
            else:
                updatedCardId = classCard.update_card(updatedFields)
                
            _, updatedCardCursor = Card.get_card_by_id(cardId)

            return jsonify(updatedCardCursor)


@app.route('/card/checklist/create/<string:cardId>', methods=['POST'])
@user_dec.login_required
def create_checklist(cardId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        classCard, _ = Card.get_card_by_id(cardId)

        justCreatedChecklist = classCard.add_checklist({
            'authorId' : session['email'],
            'cardId': cardId, 
            **CONTENT.get('checklists')
        })

        return jsonify(justCreatedChecklist)


@app.route('/card/checklist/update/<string:checkListId>', methods=['POST'])
@user_dec.login_required
def update_checklist(checkListId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        classCheckList = Checklist.get_by_id(checkListId)

        if CONTENT.get('title') is not None:
            isUpdated = classCheckList.set_new_title(CONTENT.get('title'))

            return jsonify(isUpdated)


@app.route('/card/checklist/remove/<string:checkListId>', methods=['DELETE'])
@user_dec.login_required
def remove_checklist(checkListId):
    
    classCheckList = Checklist.get_by_id(checkListId)
    cardId = classCheckList.dict_from_class()['cardId']
    classCard, _ = Card.get_card_by_id(cardId)

    classCard.remove_checklist(checkListId)
    isRemoved = classCheckList.remove_self()
    if isRemoved == checkListId:
        return jsonify(isRemoved)

    return "We dont remove this one "


@app.route('/card/checklist/add_item/<string:checkListId>', methods=['POST'])
def add_item_to_checklist(checkListId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()
        classCheckList = Checklist.get_by_id(checkListId)

        result = classCheckList.add_item(CONTENT)

        return jsonify(result)
        

@app.route('/card/checklist/update_item/<string:checklistId>/<string:itemId>', methods=['POST'])
def update_item(checklistId, itemId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        classList = Checklist.get_by_id(checklistId)

        if CONTENT.get('isCompleted') is not None:
            updatedId = classList.toggle_item(itemId, CONTENT.get('isCompleted'))
        
        if CONTENT.get('title') is not None:
            updatedId = classList.update_item(itemId, CONTENT.get('title'))
        updated = Checklist.get_by_id(updatedId).dict_from_class()
        return jsonify(updated)


@app.route('/card/checklist/delete_item/<string:checklistId>/<string:itemId>', methods=['DELETE'])
def remove_item(checklistId, itemId):
    if request.method == 'DELETE':
        classList = Checklist.get_by_id(checklistId)
        result = classList.remove_item(itemId)

        return jsonify(result)


@app.route('/card/remove_attachment/<string:cardId>', methods=['DELETE'])
def delete_attachment_from_card(cardId):
    if request.method == 'DELETE' and request.is_json:
        CONTENT = request.get_json()

        fileId = CONTENT.get('file')

        classCard, _ = Card.get_card_by_id(cardId)

        deletedFile = classCard.delete_attachment(fileId)

        return jsonify(deletedFile)



@app.route('/card/get_all_cards/<string:boardId>')
def get_all_cards(boardId):
    cardsCursor =  Card.get_card_by_boardId(boardId)
    cardsWithChecklists = Card.return_with_checklists(cardsCursor)
    cardsWithAssignedFiled = Card.return_with_assigned_files(cardsWithChecklists)

    return jsonify(cardsWithAssignedFiled)

@app.route('/card/add_attachment/<string:cardId>', methods=['POST'])
def add_attachment_to_card(cardId):
    image_file = request.files['attachment']

    contentType = image_file.content_type
    fileName = image_file.filename

    classCard, _ = Card.get_card_by_id(cardId)
    updatedCard, newImageId = classCard.add_attachment(image_file, contentType, fileName)

    fsClass = FS.get(newImageId)
    imageStr = Utils.prepareImage(fsClass)

    imgAssigned = updatedCard['attachments']['assigned']

    if imgAssigned == newImageId:
        assignedImage = True
    else:
        assignedImage = False
            
    responseSchema = {
        '_id' : updatedCard['_id'],
        'forList' : updatedCard['forList'],
        'boardId': updatedCard['boardId'],
        'attachments' : {
            'file_id' : newImageId,
            'image' : imageStr,
            'assigned' : assignedImage,
            'filename' : fsClass.filename,
            'uploadDate' : fsClass.uploadDate
        }
    }
    
    return jsonify(responseSchema)


@app.route('/card/get_attachments/<string:cardId>')
def get_attachments_for_card(cardId):
    _, cursrosCard = Card.get_card_by_id(cardId)
    cardsWithImages = Card.get_attachment_in_string(cursrosCard)

    return jsonify(cardsWithImages)

@app.route('/card/card_schema', methods=['GET'])
def card_schema():
    cardSchema = Card.card_schema_for_client()
    return jsonify(cardSchema)

##########################
############### Comment API
##########################
@app.route("/comment/add_comment/<string:cardId>", methods=["POST", "GET"])
@user_dec.login_required
def add_comment_to_card(cardId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        description = CONTENT.get("description")
        user = User.get_user_by_email(session['email'])

        commentId = Comment(
            description=description,
            authorId=user.get("_id"),
            forCard=cardId
        ).save()

        cursorComment, _ = Comment.get_by_id(commentId)
        classCard, _ = Card.get_card_by_id(cardId)
        classCard.add_comment(cursorComment.get('_id'))
        User(**user).add_comment(commentId)

        return jsonify(cursorComment)


@app.route("/comment/get_comments_for_card/<string:cardId>", methods=["GET"])
@user_dec.login_required
def get_comments_for_card(cardId):
    try:
        _, _ = Card.get_card_by_id(cardId)
    except CardError.CardError as error:
        jsonify(error=error.message)

    commentsList = Comment.get_comments_for_card(cardId)

    return jsonify(commentsList)


@app.route('/comment/delete_comment/<string:commentId>', methods=["DELETE"])
@user_dec.login_required
def remove_comment(commentId):
    _, classComment = Comment.get_by_id(commentId)
    result = classComment.delete_comment(commentId)
    if result:
        return jsonify(result)

    

@app.route('/comment/edit_comment/<string:commentId>', methods=["POST"])
@user_dec.login_required
def edit_comment(commentId):
    if request.method == 'POST' and request.is_json:
        CONTENT = request.get_json()

        description = CONTENT.get('description')
        _ , commentClass = Comment.get_by_id(commentId)
        updatedCursorComment = commentClass.update_comment(description)

        return jsonify(updatedCursorComment)



if __name__ == '__main__':
    app.run(port=4000, debug=True)