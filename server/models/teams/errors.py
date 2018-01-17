class TeamError(Exception):
    def __init__(self, message):
        self.message = message


class TeamIsAlreadyExist(TeamError):
    pass

