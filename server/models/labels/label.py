from server.common.database import Database
import uuid

class Label(object):
    def __init__(self, description, color='#ffffff', _id=None):
        self.color = color
        self.description = description if description is not None else str()
        self._id = uuid.uuid4().hex if _id is None else _id
    
    def __repr__(self):
        return "<Label with color {}>".format(self.color)
    
    @staticmethod
    def default_labels():

        red_label = {
            '_id' : uuid.uuid4().hex,
            'color' : '#c62828',
            'description' : ''
        }

        yellow_label = {
            '_id' : uuid.uuid4().hex,
            'color' : '#eeff41',
            'description' : ''
        }

        green_label = {
            '_id' : uuid.uuid4().hex,
            'color' : '#00e676',
            'description' : ''
        }

        blue_label = {
            '_id' : uuid.uuid4().hex,
            'color' : '#42a5f5',
            'description' : ''
        }

        labels = [
            red_label,
            yellow_label,
            green_label,
            blue_label
        ]
        

        return labels
