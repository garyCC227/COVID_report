import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.api_core.exceptions import NotFound
import json
import os
import sys


cred = credentials.Certificate(".\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def updateKeywordListDictToArray():


    query = db.collection(u'reports')
    docs = query.stream()
    batch = db.batch()
    count = 0
    for doc in docs:
        print(doc.id)
        keyword_array = []
        elem = doc.to_dict()
        for keyword in elem['keyword_list']:
            print(keyword)
            keyword_array.append(keyword)

        new_ref = db.collection(u'reports').document(doc.id)
        batch.set(new_ref, {u'keyword_list': keyword_array}, merge=True)
        count += 1
        if count % 500 == 0:
            batch.commit()

    batch.commit()


updateKeywordListDictToArray()