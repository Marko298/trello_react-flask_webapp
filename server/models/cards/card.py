from server.common.database import Database, FS

from server.models.checklist.checklist import Checklist
import server.models.cards.errors as err

from bson import ObjectId

import uuid

class Card(object):
    collection = 'cards'
    def __init__(self, title, forList, boardId, attachments=None, _id=None, labels=None, comments=None, checklists=None, description=None):
        self.title = title
        self.forList = forList
        self.boardId = boardId
        self.labels = labels if labels is not None else list()
        self.description = description if description is not None else str()
        self._id = uuid.uuid4().hex if _id is None else _id
        self.comments = comments if comments is not None else list()
        self.checklists = checklists if checklists is not None else list()
        self.attachments = attachments if attachments is not None else {'files' : [], 'assigned': ''}
    
    def __repr__(self):
        return '<Card with title — {}>'.format(self.title)

    def add_attachment(self, file, content_type, file_name):
        filedId = FS.put(file, content_type, file_name)

        stringId = str(filedId)

        if len(self.attachments['files']) == 0:
            Database.update_one(Card.collection, {'_id': self._id}, {'attachments.assigned': stringId})
        Database.update_push(Card.collection, { '_id': self._id }, {
            'attachments.files' : stringId
        })

        return FS.get(ObjectId(stringId))

        return 'yeah'


    def add_checklist(self, newChecklist):
        checklistId = Checklist(**newChecklist).save()

        updatedCardId = Database.update_push(
            'cards',
            {'_id': self._id},
            {'checklists': checklistId}
        )

        justCreatedCheckList = Checklist.get_by_id(checklistId).dict_from_class()

        return justCreatedCheckList

    def remove_checklist(self, checklistId):
        Database.delete_one_from_array('cards', {'_id': self._id}, {'checklists': checklistId })

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
        curdId = Database.update_one('cards', {'_id': self._id}, {**update})
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
            "comments" : "",
            "checklists" : "",
            "attachments" : ""
        }

    def json(self):
        return {
            "_id" : self._id,
            "title" : self.title,
            "forList" : self.forList,
            "description" : self.description,
            "boardId" : self.boardId,
            "labels" : self.labels,
            "comments" : self.comments,
            "checklists" : self.checklists,
            "attachments" : self.attachments
        }




