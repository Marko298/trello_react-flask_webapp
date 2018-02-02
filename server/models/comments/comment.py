from server.common.database import Database


import uuid

from datetime import datetime
import pytz

tz = pytz.timezone("Europe/Kiev")
ct = datetime.now(tz=tz)
time = ct.isoformat()

class Comment(object):
    def __init__(self, description, authorId, forCard, timeCreated=None, _id=None):
        self.description = description
        self.authorId = authorId
        self.forCard = forCard
        self.timeCreated = time if timeCreated is None else timeCreated
        self._id = uuid.uuid4().hex if _id is None else _id
    
    def __repr__(self):
        return "<Comment with author — {}, for — {}>".format(self.authorId, self.forCard)

    @classmethod
    def get_by_id(cls, _id):
        cursorComment = Database.find_one('comments', {'_id' : _id})
        return cursorComment, cls(**cursorComment)
    
    def get_comments_for_card(cardId):
        cursors = Database.find('comments', {'forCard': cardId})
        return [c for c in cursors]

    def update_comment(self, updates):
        commentId = Database.update_one('comments', {'_id': self._id }, {'description': updates})
        if commentId.acknowledged:
            cursor, _ = Comment.get_by_id(self._id)
            return cursor
        return "throw error cause nothink to update actually"

    def delete_comment(self, _id):
        result = Database.delete_one('comments', {'_id': self._id})
        isDocumentExist = Database.find_one('comments', {'_id': self._id})

        if result.deleted_count is 1 and isDocumentExist is None:
            return True
        return False

    def save(self):
        return Database.insert('comments', self.json())

    def json(self):
        return {
            "_id": self._id,
            "authorId": self.authorId,
            "forCard": self.forCard,
            "description": self.description,
            "timeCreated": self.timeCreated
        }
