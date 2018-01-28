class CardErrors(Exception):
    def __init__(self, message):
        self.message = message


class CardIsUndefined(CardErrors):
    pass