from server.common.database import Database
import server.models.cards.errors as err

import uuid

class Card(object):
    def __init__(self, title, forList, _id=None):
        self.title = title
        self.forList = forList
        self._id = uuid.uuid4().hex if _id is None else _id
    
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

    @staticmethod
    def card_schema_for_client():
        return {
            '_id' : '',
            'title' : '',
            'forList': ''
        }

    def json(self):
        return {
            "_id" : self._id,
            "title" : self.title,
            "forList" : self.forList
        }