import pytest
import sys
import os
import json
from langdetect import detect
from pathlib import Path
import re

for root, dirs, files in os.walk(".."):
    for d in dirs:
        # if re.search("/API_SourceCode$",os.path.abspath(os.path.join(root, d))):
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))

from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer

def test_short_article() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input1.txt","r") 
    text = f.read()
    nlp.set_publication_date("2020-01-01 12:12:12")
    reports = nlp.make_reports(text)
    print(reports)
    f.close()

test_short_article()