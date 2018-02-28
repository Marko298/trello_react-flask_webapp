from flask import Flask, render_template, request, session, jsonify
from functools import wraps

from server.models.logs.log import Log
from server.models.users.user import User

def get(obj, path):
    val = obj[path[0]]
    
    if len(path) == 1 or not val:
        return val
    rest = path[1:]
    
    return get(val, rest)

def remove_with_logs(keyWord):
    def _remove_with_logs(function):
        @wraps(function)
        def __remove_with_logs(*args, **kw):
            
            result = function(*args, **kw)
            logForComment = Log.get_by_query(kw)
            Log.remove(logForComment['_id'])

            sendUpdatedData = {
                keyWord: result,
                'log': logForComment['_id']
            }

            return jsonify(sendUpdatedData)
        return __remove_with_logs
    return _remove_with_logs


def assign_log(keyWord, path, logType):
    def _assign_log(function):
        @wraps(function)
        def __assign_log(*arg, **kw):
            
            result = function(*arg, **kw)
            user = User.get_user_by_email(session['email'])

            userId, ownId =user['_id'], result['_id']

            argForLog = {
                "userId": userId,
                "{}Id".format(keyWord) : ownId,
                **kw
            }

            justCreatedLogId = Log(**argForLog).assign_to(logType=logType)
            log = Log.get_by_id(justCreatedLogId)

            sendUpdatedData = {keyWord: result, 'log': log}

            return jsonify(sendUpdatedData)
        return __assign_log
    return _assign_log


def create_log(keyWord):
    def _create_log(function):
        def __create_log(*arg, **kw):
            result = function(*arg, **kw)

            sendUpdatedData = {
                keyWord: result,
                'log': {}
            }
            return jsonify(sendUpdatedData)
        return __create_log
    return _create_log
