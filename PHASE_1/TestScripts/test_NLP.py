import pytest
import os
import json
import sys
from pathlib import Path
import re
import filecmp

for root, dirs, files in os.walk(".."):
    for d in dirs:
        # if re.search("/API_SourceCode$",os.path.abspath(os.path.join(root, d))):
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))

from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer

# Overall test for text mining. input, output and sample output are in folder NLP_Test_data
# Take 20 seconds to run, be patient
def test_short_article() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input1.txt","r") 
    text = f.read()
    nlp.set_publication_date("2020-01-01 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output1.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output1.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output1.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()

def test_short_article_multiple_reports() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input2.txt","r") 
    text = f.read()
    nlp.set_publication_date("2018-12-12 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output2.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output2.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output2.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()


def test_long_article_single_report() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input3.txt","r") 
    text = f.read()
    nlp.set_publication_date("2018-12-12 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output3.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output3.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output3.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()


def test_comprehensive_report_1() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input4.txt","r") 
    text = f.read()
    nlp.set_publication_date("2020-01-01 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output4.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output4.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output4.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()

def test_comprehensive_report_2() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input5.txt","r") 
    text = f.read()
    nlp.set_publication_date("2019-12-12 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output5.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output5.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output5.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()


def test_comprehensive_report_3() :
    nlp = NLP_Processer()
    f = open("NLP_Test_data\\input\\input6.txt","r") 
    text = f.read()
    nlp.set_publication_date("2020-03-21 12:12:12")
    reports = nlp.make_reports(text)
    j = json.dumps(reports, indent = 2)
    f.close()
    f = open("NLP_Test_data\\output\\output6.txt","w") 
    f.write(j)
    f.close()
    f1=open("NLP_Test_data\\output\\output6.txt","r")
    f2=open("NLP_Test_data\\expected_output\\output6.txt","r")
    flag = True
    for line1 in f1:
        for line2 in f2:
            if line1 !=line2:
                flag = False
            break
    assert(flag)
    f1.close()
    f2.close()
