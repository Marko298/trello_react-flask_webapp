from server.common.database import Database
from server.common.utils import Utils
import server.models.users.errors as err
import uuid

from server.models.boards.board import Board

class User(object):
    def __init__(self, email, password, name, _id=None):
        self.email = email
        self.password = password
        self.name = name
        self._id = uuid.uuid4().hex if _id is None else _id
    
    def __repr__(self):
        return "<User {}>".format(self.email)

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

        return True, userId
        
    
    def json(self):
        return {
            "email": self.email,
            "password" : self.password,
            "name" : self.name,
            "_id" : self._id
        }

    def save(self):
        return Database.insert("users", self.json())
    
    def createBoard(self, boardName, reletedTo=None):
        if reletedTo is None:
            createdBoradFor = self._id
        else:
            createdBoradFor = reletedTo 
        newBoard = Board(boardName=boardName, reletedTo=createdBoradFor, authorId=self._id)
        Board.save()
        



