import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': project_id,
})

db = firestore.client()

for doc in cursor:
    print(doc)

def getDocument(query):
    print("TODO")

def setDocument(query, data):
    print("TODO")




