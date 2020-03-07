import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate(".//fbconfig/apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
firebase_admin.initialize_app(cred)


def getDocument(query):
    print("TODO")

def setDocument(data):
    doc_ref = db.collection(u'reports').document()
    doc_ref.set(data)


# Sample data entry
db = firestore.client()
setDocument({
    u'location': u'China',
    u'symptons': u'Coughing',
})

