import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.api_core.exceptions import NotFound
import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))


# cred = credentials.Certificate(".\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
cred = credentials.Certificate(os.path.join("db","fbconfig","apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json"))
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
    except NotFound:
        print(u'No such document!')
        return False


def queryDocumentByArguments(startDate, endDate, keywords, location):

    doc_ref = db.collection(u'reports')
    ret_arr = []
#     startDate and endDate are always specified so will always need to query date
    if keywords is [] and location is None:
        query = doc_ref.where(u'date_of_publication', '>', startDate).where(u'date_of_publication','<', endDate)
    elif keywords is []:
        query = doc_ref.where(u'date_of_publication', '>', startDate).where(u'date_of_publication','<', endDate).where(u'keyword_location', u'array_contains', location)
    elif location is None:
        query = doc_ref.where(u'date_of_publication', '>', startDate).where(u'date_of_publication', '<', endDate)
        for word in keywords:
            print(word)
            query = query.where("keyword_frequency.word" + '[' + word + ']', ">", 0)

    else:
        query = doc_ref.where(u'date_of_publication', '>', startDate).where(u'date_of_publication', '<',
                                                                            endDate).where(u'keyword_location',
                                                                                           u'array_contains', location)
        for word in keywords:
            print(word)
            query = query.where("keyword_frequency.word" + '['+word + ']', ">" , 0)


    docs = query.stream()
    for doc in docs:
        print(doc.to_dict())
        ret_arr.append(doc)

    return ret_arr


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
    query = db.collection(u'reports').where(u'keyword_list', u'array_contains', syndrome)
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

    query = db.collection(u'reports').where(u"keyword_list", u'array_contains', disease)
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
    print(data["headline"])
    # check if headline already exists
    if headlineExists(data["headline"]) is False:
        print("Writing data to database")
        doc_ref = db.collection(u'reports').document()
        doc_ref.set(data)


def readDocument(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        setDocument(data)

def headlineExists(headline):
    query = db.collection(u'reports').where(u'headline', u'==', headline )
    docs = query.get()
    for doc in docs:
        # print(doc.to_dict())
        if doc.to_dict() != "":
            print("Headline already exists in database: " + headline)
            return True

    return False



# Test code
# ret = getDocumentByLocation("China")
# print(ret)

# readDocument("./sample_data.json")
# getAllDocuments()
# getDocumentByDisease("COVID-19")
# getDocumentByLocation("beirut")
# queryDocumentByArguments("2020-03-13 20:20:21", "2020-03-13 22:20:21", [], "florida")
