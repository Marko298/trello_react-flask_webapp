from server.common.database import Database
import server.models.cards.errors as err

import uuid

class Card(object):
    def __init__(self, title, forList, boardId, _id=None, labels=None, comments=None, description=None):
        self.title = title
        self.forList = forList
        self.boardId = boardId
        self.labels = labels if labels is not None else list()
        self.description = description if description is not None else str()
        self._id = uuid.uuid4().hex if _id is None else _id
        self.comments = comments if comments is not None else list()
    
    def __repr__(self):
        return '<Card with title — {}>'.format(self.title)

    def save(self):
        return Database.insert('cards', self.json())

    @classmethod
    def get_card_by_id(cls, card_id):
        cursor = Database.find_one('cards', {'_id': card_id})
        if cursor is not None:
            return cls(**cursor), cursor
        else:
            raise err.CardIsUndefined("Thee card is undefined with this id")

    def update_card(self, update):
        curdId = Database.update_one('cards', {'_id': self._id}, update)
        return curdId


    def add_comment(self, commentId):
        Database.update_push('cards', {'_id': self._id}, { 'comments': commentId })


    def add_label(self, label):
        Database.update_one('cards', {'_id' : self._id}, {"labels": []})
        if type(label) is dict:
            Database.update_push('cards', {'_id' : self._id}, {"labels": label})
        elif type(label) is list:
            [Database.update_push('cards', {'_id' : self._id}, {"labels": lebl}) for lebl in label]


    @staticmethod
    def get_card_by_boardId(boardId):
        cursors = Database.find('cards', {'boardId': boardId})
        return [c for c in cursors]


    @staticmethod
    def card_schema_for_client():
        return {
            '_id' : '',
            'title' : '',
            'forList': '',
            "description": '',
            "boardId" : '',
            "labels" : '',
            "comments" : ""
        }

    def json(self):
        return {
            "_id" : self._id,
            "title" : self.title,
            "forList" : self.forList,
            "description" : self.description,
            "boardId" : self.boardId,
            "labels" : self.labels,
            "comments" : self.comments
        }