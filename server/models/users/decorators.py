from flask import session, jsonify
from functools import wraps

def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kargs):
        if session['email'] is None:
            message = "You have to be authenteficated before do this"
            return jsonify(error=message)
        return fn(*args, **kargs)
    
    return wrapper

