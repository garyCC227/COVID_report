import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os


cred = credentials.Certificate(os.path.dirname(__file__) + "/./fbconfig/apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
firebase_admin.initialize_app(cred)