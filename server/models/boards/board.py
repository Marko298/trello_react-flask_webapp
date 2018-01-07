from server.common.database import Database
import server.models.boards.errors as err
import datetime
import uuid

class Board(object):
    def __init__(self, boardName, authorId, isImportant,  _id=None, reletedTo=None):
        self.boardName = boardName
        self.reletedTo = authorId if reletedTo is None else reletedTo
        self.isImportant = isImportant
        self.authorId = authorId
        self._id = uuid.uuid4().hex if _id is None else _id

        self.timeCreated = datetime.datetime.now()
        self.styleSettings = self.defaultStyleSettings()

    def __repr__(self):
        return "<Board {}>".format(self.title)

    def defaultStyleSettings(self):
        backgroundColor = 'blue'
        return { "backgroundColor": backgroundColor }

    def create_board(self):
        """
            You can create board for personal profit
            or you can create board releted to any team
        """
        pass

    def set_board_to_team(self):
        pass
    
    def toggleBoardImportant(cls, boardId):
        boardCursor = Database.find_one('boards', {"_id": boardId})
        board = cls(**boardCursor)

        if board.isImportant:
            board.isImportant = False
        else:
            board.isImportant = True
        cls.save()
            
    
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
        Database.insert('boards', self.json())
        
    