from server.common.database import Database
import server.models.teams.errors as err
import uuid

class Team(object):
    def __init__(self, teamName, authorId, _id=None, boards=None):
        self.teamName = teamName
        self.authorId = authorId
        self._id = uuid.uuid4().hex if _id is None else _id
        self.boards = boards if boards is not None else list()

    def __repr__(self):
        return "<Team with name {}>".format(self.teamName)
    
    def create_team(self):
        teamNameFromDb = Database.find_one("teams", {"teamName": self.teamName})
        if teamNameFromDb is None:
            teamId = Team(teamName=self.teamName, authorId=self.authorId, boards=self.boards).save()
            _, team = Team.get_team_by_id(teamId)
            return team
        else:
            raise err.TeamIsAlreadyExist("The team with this name is already exist")
    
    @staticmethod
    def get_tems_by_author(authorId):
        teamsCursor = Database.find("teams", {"authorId": authorId})
        return [team for team in teamsCursor]

    @classmethod
    def get_team_by_id(cls, teamId):
        teamCursor = Database.find_one('teams', {"_id": teamId})
        print("teamCursor {}".format(teamCursor))
        teamClass = cls(**teamCursor)
        return teamClass, teamCursor
        
    def assign_board(self, boardId):
        curentTeamId = self._id
        query = {
            "_id": curentTeamId
        }

        addBoard = {
            "boards": boardId
        }

        Database.update_push('teams', query, addBoard)

    def json(self): 
        return {
            "_id" : self._id,
            "teamName" : self.teamName,
            "authorId" : self.authorId,
            "boards" : self.boards
        }

    def save(self):
        return Database.insert("teams", self.json())
        
    