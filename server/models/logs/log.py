from server.common.database import Database
import uuid

from datetime import datetime
import pytz

tz = pytz.timezone("Europe/Kiev")
ct = datetime.now(tz=tz)
time = ct.isoformat()

class Log:
    collection = 'logs'

    actions = {
        'CREATE' : 'create',
        'DELETE' : 'delete',
        'UPDATE' : 'update',
        'ASSIGN' : 'assign'
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

    def __init__(
            self, 
            userId, 
            boardId, 
            commentId=None, 
            teamId=None, 
            isEdited=False, 
            logType=None, 
            listId=None, 
            action=None, 
            body=None, 
            cardId=None, 
            created=None, 
            _id=None
        ):
        self.userId = userId
        self.boardId = boardId
        self._id = uuid.uuid4().hex if _id is None else _id
        self.created = time if created is None else created

        self.teamId = teamId
        self.commentId = commentId
        self.listId = listId

        self.logType = logType
        self.action = action
        self.cardId = cardId
        self.body = body

        self.isEdited = isEdited



    @property
    def rest(self):
        return {
            "_id" : self._id,
            "userId" : self.userId,
            "boardId" : self.boardId,
            "created" : self.created,
            "isEdited" : self.isEdited,
            "teamId": self.teamId,
            "commentId": self.commentId,
            "listId" : self.listId,
            "logType" : self.logType,
            "action" :self.action,
            "cardId" : self.cardId,
            "body" : self.body,
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
    
    def _action(self, action='c'):
        
        if action == 'c':
            logAction = Log.actions['CREATE']
        elif action == 'u':
            logAction = Log.actions['UPDATE']
        elif action == 'd':
            logAction = Log.actions['DELETE']
        elif action == 'a':
            logAction = Log.actions['ASSIGN']

        return logAction
        
    def assign_to(self, logType, addonsInfo=dict()):
            
        prepareData = {
            **self.rest,
            "action" : self._action(action='a'),
            "logType" : logType,
            **addonsInfo
        }

        logId = Database.insert(Log.collection, prepareData)

        return logId

    # def create(self, addonsInfo, action=None):
            
    #     prepareData = {
    #         **self.rest,
    #         "action" : self._action(action='c'),
    #         "logType" : 

    #     }


    def create_for_board(self):
        prepareData = {
            **self.rest,
            "teamId" : self.teamId,
            "logType": Log.logType['BOARD'],
            "action": Log.actions['ASSIGN'],
            "cardId" : None,
            "body" : None
        }

        logId = Database.insert(Log.collection, prepareData)
        return logId

    def for_comment(self, cardId, body, commentId, action='c'):
        if action == 'u':
            commentAction = Log.actions['UPDATE']
        elif action == 'd':
            commentAction = Log.actions['DELETE']
        else:
            commentAction = Log.actions['CREATE']
            
        prepareData = {
            **self.rest,
            "logType": Log.logType['COMMENT'],
            "action": commentAction,
            "cardId" : cardId,
            "commentId" : commentId,
            "body" : body
        }

        logId = Database.insert(Log.collection, prepareData)
        return logId
    

    def for_list(self, listId, listTitle):
        prepareData = {
            **self.rest,
            'listId' : listId,
            "logType": Log.logType['LIST'],
            "action": Log.actions['CREATE'],
            'body' : listTitle
        }

        Database.insert(Log.collection, prepareData)
        


    @staticmethod
    def remove(_id):
        Database.delete_one(Log.collection, {'_id': _id})
    
    def update(self, updates):
        query = {'_id' : self._id}
        update = {**updates, "isEdited" : True, "action" : Log.actions['UPDATE']} 
        Database.update_one(Log.collection, query, update)
        updatedCursor = Log.get_by_id(self._id)

        return updatedCursor


    def dict_from_class(self):
        return dict( (key, value) for (key, value) in self.__dict__.items() )

    def save(self):
        Database.insert(Log.collection, self.dict_from_class())
        return True
        
        

