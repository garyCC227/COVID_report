import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.api_core.exceptions import NotFound
import pytest
import json
import os
import sys

sys.path.append("F:\\Github\SENG3011_APInteresting\\PHASE_1\\API_SourceCode\\DB")

from db import readDocument, getDocumentByLocation, headlineExists, getDocumentBySyndrome, getDocumentByDisease
#cred = credentials.Certificate(".\\API_SourceCode\\DB\\fbconfig\\apinteresting-firebase-adminsdk-9y5el-1848ac33f0.json")
#firebase_admin.initialize_app(cred)
#db = firestore.client()

readDocument("test.json")

def test_getDocumentByLocation():
    ret = getDocumentByLocation("Testing place")
    assert ret != None
    #print ("test pass")
def test_setDuplicateDocument():
    readDocument("test.json")
    bool = headlineExists("This is a testing headline")
    assert bool == True
    #print ("test pass")

def test_getDocumentBySyndrome():
    readDocument("test.json")
    result = getDocumentBySyndrome("Testing syndromes")
    assert result != None
    #print ("test pass")
def test_getDocumentByDisease():
    res = getDocumentByDisease("Testing diseases")
    assert res != None
    #print ("test pass")
