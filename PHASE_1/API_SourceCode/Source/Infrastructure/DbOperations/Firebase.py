import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class Firebase:
    _config_file = os.path.dirname(__file__) + "/./fbconfig/apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json"

    def __init__(self):
        cred = credentials.Certificate(self._config_file)
        firebase_admin.initialize_app(cred)
        self._db = firestore.client()

    def get_db(self):
        return self._db
