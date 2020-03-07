import pymongo

# Password hardcoded , encrypt later
client = pymongo.MongoClient("mongodb+srv://user_1:VAOZDtAhoFZYtIhq@cluster0-kxotq.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
