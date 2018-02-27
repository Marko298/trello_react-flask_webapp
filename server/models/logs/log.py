from server.common.database import Database
import uuid

from datetime import datetime
import pytz

tz = pytz.timezone("Europe/Kiev")
ct = datetime.now(tz=tz)
time = ct.isoformat()

# {
#     _id: "ASdasda43d3",
#     userId: "asdasdewd33d",
#     boardId: "fjfytjfghgh",
#     cardId: '234234234'
#     logType: 'comment',
#     created: 'Date()',
#     action: 'save',
#     body: 'content'
# }

class Log:
    collection = 'logs'

    actions = {
        'CREATE' : 'create',
        'DELETE' : 'delete',
        'UPDATE' : 'update'
    }

    logType = {
        'COMMENT' : 'comment',
        'LIST' : 'list',
        'BOARD' : 'board',
        'ATTACHMENT' : 'attachment',
        'CHECKLIST' : 'checklist',
        'CARD' : 'carad',
        'CHECKLIST_ITEM' : 'checklist_item'
    }

    def __init__(self, userId, boardId, logType=None, action=None, body=None, cardId=None, created=None, _id=None):
        self.userId = userId
        self.boardId = boardId
        self._id = uuid.uuid4().hex if _id is None else _id
        self.created = time if created is None else created

        self.logType = logType
        self.action = action
        self.cardId = cardId
        self.body = body


    @property
    def rest(self):
        return {
            "_id" : self._id,
            "userId" : self.userId,
            "boardId" : self.boardId,
            "created" : self.created
        }
    
    @staticmethod
    def get_by_id(_id):
        cursor = Database.find_one(Log.collection, {'_id' : _id})
        return cursor

    @staticmethod
    def get_by_query(query):
        cursor = Database.find_one(Log.collection, query)
        return cursor

    @staticmethod
    def get_for_user(userId):
        ### check if userId exist
        cursor = Database.find(Log.collection, {'userId': userId})
        return [c for c in cursor]

    @staticmethod
    def get_for_board(boardId):
        ### check if boardId exist
        cursor = Database.find(Log.collection, {'boardId': boardId})
        return [c for c in cursor]

    def create_for_board(self):
        prepareData = {
            **self.rest,
            "logType": Log.logType['BOARD'],
            "action": Log.actions['CREATE'],
            "cardId" : None,
            "body" : None
        }

        logId = Database.insert(Log.collection, prepareData)
        return logId

    def create_for_comment(self, cardId, body):
        prepareData = {
            **self.rest,
            "logType": Log.logType['COMMENT'],
            "action": Log.actions['CREATE'],
            "cardId" : cardId,
            "body" : body
        }

        logId = Database.insert(Log.collection, prepareData)
        return logId
        

    @staticmethod
    def remove(_id):
        Database.delete_one(Log.collection, {'_id': _id})


    def dict_from_class(self):
        return dict( (key, value) for (key, value) in self.__dict__.items() )

    def save(self):
        Database.insert(Log.collection, self.dict_from_class())
        return True
        
        

