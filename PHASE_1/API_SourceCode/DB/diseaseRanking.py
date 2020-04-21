import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.api_core.exceptions import NotFound
import json
import os
import sys
import re
import itertools

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))
for root, dirs, files in os.walk(".."):
    for d in dirs:
        if re.search("API_SourceCode$",os.path.abspath(os.path.join(root, d))):
            sourcepath = os.path.abspath(os.path.join(root, d))
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))


# cred = credentials.Certificate(".\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
cred = credentials.Certificate(os.path.join(sourcepath,"DB","fbconfig","apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json"))
firebase_admin.initialize_app(cred)
db = firestore.client()



def getDiseaseRanking():
    ret_dict = {}
    query = db.collection(u'reports')
    docs = query.stream()
    for doc in docs:
        elem = doc.to_dict()
        # get all diseases from all reports
        for report in elem['reports']:
            for disease in report['diseases']:
                if disease not in ret_dict:
                    ret_dict[disease] = 1
                else:
                    ret_dict[disease] += 1
    #sort dict by value
    ret_dict = {k: v for k, v in sorted(ret_dict.items(), key=lambda item: item[1], reverse=True)}
    out = dict(itertools.islice(ret_dict.items(), 6))
    print(out)
    return out



getDiseaseRanking()