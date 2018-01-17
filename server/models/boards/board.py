from server.common.database import Database
import server.models.boards.errors as err
import datetime
import uuid

class Board(object):
    def __init__(self, 
                boardName, 
                authorId, 
                isImportant=False,  
                _id=None, 
                reletedTo={"teamId": None, "teamName": None},
                styleSettings=None,
                timeCreated=None):
        self.boardName = boardName
        self.reletedTo = {
            "teamId" : authorId if reletedTo.get("teamId") is None else reletedTo.get("teamId"),
            "teamName" : "default_name" if reletedTo.get("teamName") is None else reletedTo.get("teamName")
        }
        
        self.isImportant = isImportant
        self.authorId = authorId
        self._id = uuid.uuid4().hex if _id is None else _id

        self.styleSettings = self.defaultStyleSettings() if styleSettings is None else styleSettings
        self.timeCreated = datetime.datetime.now() if timeCreated is None else timeCreated

    def __repr__(self):
        return "<Board {}>".format(self.title)

    def defaultStyleSettings(self):
        backgroundColor = 'blue'
        return { "backgroundColor": backgroundColor }

    @classmethod
    def get_board(cls, _id):
        cursorBoard = Database.find_one('boards', {'_id': _id})
        return cls(**cursorBoard), cursorBoard


    @classmethod
    def get_boards_by_author(cls, authorId):
        cursorBoards = Database.find('boards', {'authorId': authorId})
        # [cls(**board) for board in cursorBoards], 
        return [board for board in cursorBoards]
    
    def toggleBoardImportant(self, isImportant):
        Database.update_one('boards', {'_id': self._id}, {'isImportant': isImportant})
        cursorBoard = Database.find_one('boards', {'_id': self._id})
        return cursorBoard


    def create_board(self):
        """
            You can create board for personal profit
            or you can create board releted to any team
        """
        pass

    def set_board_to_team(self):
        pass
    
            
    
    def change_background_to(self):
        pass
    
    def board_activity_log(self):
        # here will got a list of dictionaries all people who edit or change something
        # in this board

        ## tiem
        ## name || nirkanme

        pass

    def json(self):
        return {
            "boardName": self.boardName,
            "reletedTo": self.reletedTo,
            "isImportant" : self.isImportant,
            "styleSettings" : self.styleSettings,
            "timeCreated" : self.timeCreated,
            "_id" : self._id,
            "authorId" : self.authorId
        }

    def save(self):
        return Database.insert('boards', self.json())
        
    