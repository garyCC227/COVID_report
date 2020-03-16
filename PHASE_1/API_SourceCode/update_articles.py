from langdetect import detect
from db.db import setDocument
from scrapy_script.last_activity import ActivityPost
from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer
import requests
import json
import validators

def fetch_resource_context(i):
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

  if len(content) < 300 or content[3:10] in "NCBIErrorYour access to the NCBI website":
    return

  if detect(content) != "en":
    return 

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
  # json_file = json.loads(json_file)
  print(json_file)
  # setDocument(json_file)

def update_post(posts, PS):
  with open('content.json', 'r') as f:
    data = json.load(f)

  last_timestamp = data['lastDatestamp']

  # posts is sorted by decreasing order
  new_posts = []
  for post in posts:
    # print((post['date']))
    if int(post['datestamp']) > last_timestamp:
      new_posts.append(post)
    else:
      break
      # pass
  #
  if len(new_posts) >= 1:
    new_data = {
      "posts" : new_posts,
      "count" : len(new_posts),
      "lastDatestamp": PS.last_datestamp,
      "date": str(PS.last_date)
    }
    with open('posts.json', 'w') as f:
      json.dump(new_data, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)
  else:
    print("No new posts\n")
    return

if __name__ == "__main__":

  # formData = 'filters%5Bnodeid%5D=0&filters%5Bview%5D=activity&filters%5Bper-page%5D={}&filters%5Bpagenum%5D=1&filters%5Bmaxpages%5D=1&filters%5Buserid%5D=0&filters%5BshowChannelInfo%5D=1&filters%5Bfilter_time%5D=time_all&filters%5Bfilter_show%5D=show_all&filters%5Bfilter_new_topics%5D=1&isAjaxTemplateRender=true&isAjaxTemplateRenderWithData=true&securitytoken=guest'.format(num_post)
  formData = 'filters%5Bnodeid%5D=0&filters%5Bview%5D=activity&filters%5Bper-page%5D={}&filters%5Bpagenum%5D=1&filters%5Bmaxpages%5D=1&filters%5Buserid%5D=0&filters%5BshowChannelInfo%5D=1&filters%5Bfilter_time%5D=time_all&filters%5Bfilter_show%5D=show_all&filters%5Bfilter_new_topics%5D=1&isAjaxTemplateRender=true&isAjaxTemplateRenderWithData=true&securitytoken=guest'.format(num_post)
  headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
  res = requests.post('https://flutrackers.com/forum/activity/get', headers=headers, data=formData)
  res = json.loads(res.text)

  #ActivityPost object. do anything you want here
  PS = ActivityPost(res['template'], int(res['lastDate']))

  posts = [x for x in PS.get_posts()] 
  sorted_posts = sorted(posts, key=lambda x:x['datestamp'], reverse=True)
  # build a good format dict to store in json

  update_post(sorted_posts, PS)    

  # Now we have the lastest activities urls, I try transfer bash to python

	for i in 0..1398 :
		fetch_resource_context(i)

