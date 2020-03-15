import json
import validators
import sys

from last_activity import ActivityPost
from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer
# import db
'''
this file is used to get all the source_url content
by the urls in posts.json

'''


def main():
  i = int(sys.argv[1])
  print("number is :************************************************ ", i)
  with open('posts.json', 'r') as f:
    data = json.load(f)

  with open('content.json', 'r') as f:
    store = json.load(f)

  post = data['posts'][i]
  nodeid = post['nodeid']
  date = post['date']
  datestamp = post['datestamp']
  flutrack_content = ['flu_trackers_post_content']
  url = post['url']

  if int(datestamp) < store['lastDatestamp']:
    print('this is not a newer post\n')
    return

  if not validators.url(url):
    return
    
  title, content = ActivityPost.get_source_text_for_onepost(url)
  newpost = {}
  newpost[nodeid] = {
    "date": date,
    "datestamp":datestamp,
    "flu_trackers_post_content" : content,
    "url":url,
    'title':title,
    'content':content
  }

  nlp_processer = NLP_Processer()
    
  reports = nlp_processer.make_reports(content)
  d = {}
  d["url"] = url
  d["date_of_publication"] = date
  d["headline"] = title
  d["main_text"] = content
  d["reports"] = reports
  d["keyword_frequency"] = nlp_processer.get_keyword_frequency()
  d["keyword_location"] = nlp_processer.get_keyword_location()
  d["keyword_list"] = nlp_processer.get_keyword_list()
  
  json_file = json.dumps(d, indent = 2)
  # db.db.setDocument(json_file)





  # TODO: add NLP


  # store["posts"][nodeid] = {
  #   "date": date,
  #   "datestamp":datestamp,
  #   "flu_trackers_post_content" : content,
  #   "url":url,
  #   'title':title,
  #   'content':content
  # }
  # print(title)
  
  # store['count'] = store['count'] + 1
  # store['date'] = data['date']
  # store['lastDatestamp'] = data['lastDatestamp']

  # with open('content.json', 'w') as f:
  #   json.dump(store, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)



if __name__ == "__main__":
  # print(sys.argv[1])
  main()