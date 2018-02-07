from passlib.hash import pbkdf2_sha512
import re
import codecs

class Utils(object):
    @staticmethod
    def email_is_valid(email):
        email_adress_mather = re.compile("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
        return True if email_adress_mather.match(email) else False

    @staticmethod
    def hash_password(password):
        return pbkdf2_sha512.encrypt(password)
    
    @staticmethod
    def check_hashed_password(password, hashed_password):    
        return pbkdf2_sha512.verify(password, hashed_password)

    @staticmethod
    def prepareImage(fsClass):
        base64_data = codecs.encode(fsClass.read(), 'base64')
        image = base64_data.decode('utf-8')
        img_str = "data:image/png;base64," + image
        return img_str
