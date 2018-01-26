from server.common.database import Database
from server.models.boards.board import Board
import server.models.lists.errors as err
import uuid


class List(object):
    def __init__(self, title, forBoard, items=None, _id=None):
        self.title = title
        self.forBoard = forBoard
        self._id = uuid.uuid4().hex if _id is None else _id
        self.items = items if items is not None else list()
    
    def __repr__(self):
        return "<List with tyje title — {}>".format(self.title)

    def save(self):
        return Database.insert('lists', self.json())

    @classmethod
    def get_list_by_id(cls, listId):
        cursorList = Database.find_one('lists', {"_id" : listId})
        if cursorList is not None:
            return cursorList, cls(**cursorList)
        else:
            raise err.ListWithTihsIdIsNotExist("The list with this is is not exist in database")

    @classmethod
    def get_all_lists_releted_to_board(cls, boardId):
        cursorLists = Database.find('lists', {"forBoard": boardId})
        return [list for list in cursorLists], [cls(**list) for list in cursorLists]

    def json(self):
        return {
            "_id" : self._id,
            "title" : self.title,
            "forBoard" : self.forBoard,
            "items" : self.items
        }
