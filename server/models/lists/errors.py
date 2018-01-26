class ListErrors(Exception):
    def __init__(self, message):
        self.message = message

class ListWithTihsIdIsNotExist(ListErrors):
    pass


