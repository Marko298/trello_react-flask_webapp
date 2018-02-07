from server.common.database import Database
import uuid

class Checklist(object):
    collection = "checklists"
    
    def __init__(self, title, cardId, authorId, items=None, _id=None):
        self.title = title
        self.cardId = cardId
        self.authorId = authorId
        self._id = uuid.uuid4().hex if _id is None else _id
        self.items = items if items is not None else list()

    def dict_from_class(self):
        return dict( (key, value) for (key, value) in self.__dict__.items() )


    @classmethod
    def get_by_id(cls, id):
        cursor = Database.find_one(Checklist.collection, {'_id': id})
        return cls(**cursor)

    def set_new_title(self, title):
        query = {'_id': self._id}
        update = {'title': title}
        Database.update_one(Checklist.collection, query, update)
        updatedChecklist = Checklist.get_by_id(self._id).dict_from_class()

        return updatedChecklist
    
    def remove_self(self):
        Database.delete_one(Checklist.collection, {'_id': self._id})
        return self._id

    def add_item(self, item):
        itemDict = Item(**item).dict_from_class()
        query = {'_id' : self._id}
        newItem = {'items' : itemDict}

        Database.update_push( Checklist.collection, query,newItem )
        updatedClass = Checklist.get_by_id(self._id).dict_from_class()

        return updatedClass


    def toggle_item(self, itemId, isCompleted):
        query = {'_id' : self._id,'items._id' : itemId }
        toUpdate = {'items.$.isCompleted' : isCompleted }
        Database.update_one(Checklist.collection, query, toUpdate)

        return self._id



    def update_item(self, itemId, title):
        query = { '_id' : self._id, 'items._id' : itemId }
        toUpdate = { 'items.$.title' : title }
        Database.update_one(Checklist.collection, query, toUpdate)

        return self._id
        
    def remove_item(self, itemId):
        query = {'_id' : self._id }
        document = { 'items' : {'_id' : itemId} }
        Database.delete_one_from_array(Checklist.collection, query, document)
        cursor = Database.find_one(Checklist.collection, query)
        isRemovedtItemExist = list(filter(lambda c: c['_id'] == itemId, cursor['items']))

        if len(isRemovedtItemExist) == 0:
            return True
        return False

    def save(self):
        return Database.insert(Checklist.collection, self.dict_from_class())



class Item(object):
    def __init__(self, title, isCompleted=False, _id=None):
        self.title = title
        self.isCompleted = isCompleted
        self._id = uuid.uuid4().hex if _id is None else _id

    def __repr__(self):
        return '<Item with the title {} and status — {}>'.format(self.title, self.isCompleted)

    def dict_from_class(self):
        return dict( (key, value) for (key, value) in self.__dict__.items() )

