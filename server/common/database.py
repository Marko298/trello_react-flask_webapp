import pymongo

class Database(object):
    URI = 'mongodb://127.0.0.1:27017'
    DATABASE = None

    @staticmethod
    def initialize():
        client = pymongo.MongoClient(Database.URI)
        Database.DATABASE = client['trello']

    @staticmethod
    def insert(collection, data):
        cursorId = Database.DATABASE[collection].insert(data)
        return cursorId 
    
    @staticmethod
    def find(collection, query):
        cursors = Database.DATABASE[collection].find(query)
        return cursors
    
    @staticmethod
    def find_one(collection, query):
        cursor = Database.DATABASE[collection].find_one(query)
        return cursor
    
    @staticmethod
    def delete_one(collection, data):
        Database.DATABASE[collection].delete_one(data)

    @staticmethod
    def update_one(collection, query, newData):
        Database.DATABASE[collection].update_one(query, {"$set": newData})
        
