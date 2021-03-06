import json
import validators
import sys
import os
import time
import re


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))
for root, dirs, files in os.walk(".."):
    for d in dirs:
        if re.search("API_SourceCode$",os.path.abspath(os.path.join(root, d))):
            sourcepath = os.path.abspath(os.path.join(root, d))
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))

from DB.db import *
from Scrapy.last_activity import ActivityPost
from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer
from langdetect import detect
from datetime import datetime
from pathlib import Path

# import sys
# sys.path.insert(1,"C:\\Users\\ASUS\\se3011\\SENG3011_APInteresting\\PHASE_1\\API_SourceCode\\db")
'''
this file is used to get all the source_url content
by the urls in posts.json

'''

def fetch_resource_context(i):
  print("number is :************************************************ ", i)
  with open(Path(sourcepath,'Scrapy/posts.json'), 'r') as f:
    data = json.load(f)

  with open(Path(sourcepath, 'Scrapy/content.json'), 'r') as f:
    store = json.load(f)

  post = data['posts'][i]
  nodeid = post['nodeid']
  date = post['date']
  date = date.replace("T", " ")
  datestamp = post['datestamp']
  flutrack_content = ['flu_trackers_post_content']
  url = post['url']

  if int(datestamp) < store['lastDatestamp']:
    print('this is not a newer post\n')
    return

  if not validators.url(url):
    return
  
  open(Path(sourcepath, 'Scrapy/temp.html'), 'w').close()
  title, content = ActivityPost.get_source_text_for_onepost(url)
  open(Path(sourcepath, 'Scrapy/temp.html'), 'w').close()

  # print(date)
  # print(url)
  newpost = {}
  newpost[nodeid] = {
    "date": date,
    "datestamp":datestamp,
    "flu_trackers_post_content" : flutrack_content,
    "url":url,
    'title':title,
    'content':content
  }

  if len(title) < 2 or len(content) < 300 or content[3:10] in "NCBIErrorYour access to the NCBI website":
    print("Cannot Access or too less content\n")
    return

  if detect(content) != "en":
    print("No English\n")
    return 

  if title == "Access Denied" :
    print("Auh")
    return

  nlp_processer = NLP_Processer()
  nlp_processer.set_publication_date(date)
  reports = nlp_processer.make_reports(content)
  d = {}
  d["url"] = url
  dt = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
  ts = time.mktime(dt.timetuple())
  d["date_of_publication"] = int(ts)
  d["headline"] = title
  d["main_text"] = content
  d["reports"] = reports
  d["keyword_frequency"] = nlp_processer.get_keyword_frequency()
  d["keyword_location"] = nlp_processer.get_keyword_location()
  d["keyword_list"] = nlp_processer.get_keyword_list()
  
  json_file = json.dumps(d, indent = 2)
  print(json_file)
  json_file = json.loads(json_file)
  setDocument(json_file)

if __name__ == "__main__":
    i = int(sys.argv[1])
    fetch_resource_context(i)