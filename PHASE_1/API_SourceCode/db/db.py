import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
cred = credentials.Certificate(".//fbconfig/apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def getDocumentByID(id):
    ret_arr = []
    query = db.collection(u'reports').where(u'id' , u'==', id)
    docs = query.stream()
    for doc in docs:
        ret_arr.append(doc.to_dict())
    return ret_arr

def getDocumentByLocation(location):
    ret_arr = []
    query = db.collection(u'reports').where(u'locations', u'array_contains', location)
    docs = query.stream()
    for doc in docs:
        ret_arr.append(doc.to_dict())
    return ret_arr

def getDocumentBySyndrome(syndrome):
    ret_arr = []
    query = db.collection(u'syndromes').where(u'locations', u'array_contains', syndrome)
    docs = query.stream()
    for doc in docs:
        ret_arr.append(doc.to_dict())
    return ret_arr

def getDocumentByDisease(disease):
    ret_arr = []
    query = db.collection(u'diseases').where(u'locations', u'array_contains', disease)
    docs = query.stream()
    for doc in docs:
        ret_arr.append(doc.to_dict())
    return ret_arr


def setDocument(data):
    doc_ref = db.collection(u'reports').document()
    doc_ref.set(data)
# Sample data entry


with open('sample_data.json', 'r', encoding='utf-8') as f :
    data = json.load(f)
    print(data)

setDocument(data)
ret = getDocumentByID(1)
print(ret)

