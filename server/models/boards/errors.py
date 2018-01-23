class BoardError(Exception):
    def __init__(self, message):
        self.message = message


class BoardIsNotExistInDatabase(BoardError):
    pass

