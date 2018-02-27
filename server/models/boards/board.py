from server.common.database import Database
import server.models.boards.errors as error
import datetime
import uuid

class Board(object):
    collection = 'boards'
    def __init__(self, 
                boardName, 
                authorId, 
                isImportant=False,  
                _id=None,
                reletedTo={"teamId": None, "teamName": None},
                members=None,
                styleSettings=None,
                timeCreated=None,
                lists=None):
        self.boardName = boardName
        self.reletedTo = {
            "teamId" : authorId if reletedTo.get("teamId") is None else reletedTo.get("teamId"),
            "teamName" : "default_name" if reletedTo.get("teamName") is None else reletedTo.get("teamName")
        }
        
        self.isImportant = isImportant
        self.authorId = authorId
        self._id = uuid.uuid4().hex if _id is None else _id

        self.members = members if members is not None else list()

        self.styleSettings = self.defaultStyleSettings() if styleSettings is None else styleSettings
        self.timeCreated = datetime.datetime.now() if timeCreated is None else timeCreated

        self.lists = lists if lists is not None else list()

    def __repr__(self):
        return "<Board {}>".format(self.title)

    def defaultStyleSettings(self):
        backgroundColor = 'rgb(0, 121, 191)'
        return { "backgroundColor": backgroundColor }

    @classmethod
    def get_board(cls, _id):
        cursorBoard = Database.find_one('boards', {'_id': _id})
        if cursorBoard is not None:
            return cls(**cursorBoard), cursorBoard
        else:
            raise error.BoardIsNotExistInDatabase("The board with this Id is not exist in Database")

    def update(self, updates):
        isUpdatedResult = Database.update_one(Board.collection, {'_id': self._id}, {**updates})

        if isUpdatedResult.raw_result['nModified']  == 1:
            return {'_id': self._id, **updates, 'reletedTo': self.reletedTo}

        return "Nothink to update"


    @classmethod
    def get_boards_by_author(cls, authorId):
        cursorBoards = Database.find('boards', {'authorId': authorId})
        return [board for board in cursorBoards]
    
    def toggleBoardImportant(self, isImportant):
        Database.update_one('boards', {'_id': self._id}, {'isImportant': isImportant})
        cursorBoard = Database.find_one('boards', {'_id': self._id})
        return cursorBoard

    @classmethod
    def remove_board(cls, boardId, removeFromTeamCollection):
        _, boardCursor = Board.get_board(boardId)

        teamId = boardCursor['reletedTo']['teamId']
        deletedBoard = Database.delete_one('boards', {"_id": boardId})
        removeFromTeamCollection(teamId, boardId)

    def assign_list_to_board(cls, listId):
        print("The assign_list_to_board — {}".format(cls._id))
        Database.update_push('boards', {'_id': cls._id}, {"lists": listId})
    
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
            "authorId" : self.authorId,
            "lists" : self.lists
        }

    def save(self):
        return Database.insert('boards', self.json())
        
    