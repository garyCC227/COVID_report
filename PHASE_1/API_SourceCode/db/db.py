import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
# cred = credentials.Certificate(".\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
cred = credentials.Certificate(r"C:\\Users\\ASUS\\se3011\\SENG3011_APInteresting\\PHASE_1\\API_SourceCode\\db\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def getDocumentByID(id):

    doc_ref = db.collection(u'reports').document(id)
    try:
        doc = doc_ref.get()
        ret_dict = doc.to_dict()
        ret_dict['id'] = id
        print(ret_dict)
        return ret_dict
    except google.cloud.exceptions.NotFound:
        print(u'No such document!')
        return false

def getDocumentByLocation(location):
    location = location.lower()
    ret_arr = []
    query = db.collection(u'reports').where(u'keyword_location', u'array_contains', location)
    docs = query.stream()
    for doc in docs:
        # extract id from document and add it into return dictionary
        print(doc.to_dict())
        ret_dict = doc.to_dict()
        ret_dict['id'] = doc.id
        ret_arr.append(ret_dict)
    return ret_arr

def getDocumentBySyndrome(syndrome):
    syndrome = syndrome.lower()
    query_dict = {}

    ret_arr = []
    query = db.collection(u'reports').where(u'keywords', u'array_contains', syndrome)
    # var query = db.collection('chatDocs').where("chatMembers", "array-contains", { : "xyz", userName: "abc" });

    docs = query.stream()
    for doc in docs:
        # extract id from document and add it into return dictionary
        print(doc.to_dict())
        ret_dict = doc.to_dict()
        ret_dict['id'] = doc.id
        ret_arr.append(ret_dict)
    return ret_arr

def getDocumentByDisease(disease):
    disease = disease.lower()
    ret_arr = []
    # query = db.collection(u'reports').where(u'diseases', u'array_contains', disease)

    query = db.collection(u'reports').where(u"keywords", u'array_contains', disease)
    docs = query.stream()

    for doc in docs:
        # extract id from document and add it into return dictionary
        print(doc.to_dict())
        ret_dict = doc.to_dict()
        ret_dict['id'] = doc.id
        ret_arr.append(ret_dict)
    return ret_arr

def getAllDocuments():
    ret_arr = []
    query = db.collection(u'reports')
    docs = query.stream()
    for doc in docs:
        # extract id from document and add it into return dictionary
        elem = doc.to_dict()
        elem['id'] = doc.id
        ret_arr.append(elem)
    return ret_arr


def setDocument(data):
    print(data)
    doc_ref = db.collection(u'reports').document()
    doc_ref.set(data)

def readDocument(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        setDocument(data)

# Test code
# ret = getDocumentByLocation("China")
# print(ret)

# readDocument("./sample_data.json")
# getAllDocuments()
# getDocumentByDisease("COVID-19")
# getDocumentByLocation("beirut")

