class UserError(Exception):
    def __init__(self, message):
        self.message = message


class IncorectPassword(UserError):
    pass

class UserNotExist(UserError):
    pass

class UserIsAlreadyExist(UserError):
    pass
    
class InvalidEmail(UserError):
    pass

class BoardNameIsAlerayExist(UserError):
    pass

