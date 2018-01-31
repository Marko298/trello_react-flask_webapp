from server.common.database import Database
from server.models.labels.label import Label
from server.common.utils import Utils
import server.models.users.errors as err
import uuid

from server.models.boards.board import Board

class User(object):
    def __init__(self, email, password, name, boards=None, _id=None):
        self.email = email
        self.password = password
        self.name = name
        self._id = uuid.uuid4().hex if _id is None else _id
        self.boards = boards if boards is not None else list()
        
    @property
    def labels(self):
        return Label.default_labels()

    def __repr__(self):
        return "<User {}>".format(self.email)

    def assign_board(self, boardId):
        Database.update_push('users', {"_id": self._id}, {"boards": boardId})
        
        
    @classmethod
    def get_user_by_id(cls, queryID):
        cursorUser = Database.find_one('users', {"_id": queryID})
        return cls(**cursorUser)

    @staticmethod
    def get_user_by_email(email):
        cursorUser = Database.find_one('users', {"email": email})
        return cursorUser

    @staticmethod
    def is_login_valid(email, password):
        user_data = Database.find_one('users', {"email": email})

        if user_data is None:
            raise err.UserNotExist("User is not exist")
        if not Utils.check_hashed_password(password, user_data['password']):
            raise err.IncorectPassword("Wrond password")
        
        return True
            
    @staticmethod
    def register_user(email, password, name):
        user_data = Database.find_one('users', {"email": email})
        print("There is current user {}".format(user_data))

        if user_data is not None:
            raise err.UserIsAlreadyExist("The user with {} is already exist".format(email))
        
        if not Utils.email_is_valid(email):
            raise err.InvalidEmail("Please, write a valid email")
        
        userId = User(email, Utils.hash_password(password), name).save()
        userCursor = Database.find_one('users', {'_id': userId})

        return True, userCursor
        
    
    def json(self):
        return {
            "email": self.email,
            "password" : self.password,
            "name" : self.name,
            "_id" : self._id,
            "labels" : self.labels
        }

    def save(self):
        return Database.insert("users", self.json())
    

    @staticmethod
    def get_board(boardId):
        boardClass, cursorBoard = Board.get_board(boardId)
        return boardClass, cursorBoard
        
    
    @classmethod
    def get_own_boards(cls, authorEmail):
        user = cls.get_user_by_email(authorEmail)
        print("user", user)
        # classBoard, 
        cursorBoard = Board.get_boards_by_author(user['_id'])
        return cursorBoard
        



