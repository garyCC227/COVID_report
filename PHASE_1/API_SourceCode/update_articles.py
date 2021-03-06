from langdetect import detect
import requests
import json
import validators
import os
import sys,re
import subprocess
from pathlib import Path

sys.path.append(os.path.abspath('__file__'))
for root, dirs, files in os.walk(".."):
    for d in dirs:
        if re.search("API_SourceCode$",os.path.abspath(os.path.join(root, d))):
            sourcepath = os.path.abspath(os.path.join(root, d))
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))

# from DB.db import setDocument
from Scrapy.last_activity import ActivityPost
from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer

def update_post(posts, PS):
  with open(Path(sourcepath, 'Scrapy/content.json'), 'r') as f:
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
    with open(Path(sourcepath, 'Scrapy/posts.json'), 'w') as f:
      json.dump(new_data, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)

    return len(new_posts)
  else:
    print("No new posts\n")
    return 0


def main():
  num_post = 30 #NOTE: we assume 15 new posts addded in flu trackers. so we only get 15 posts back
  # formData = 'filters%5Bnodeid%5D=0&filters%5Bview%5D=activity&filters%5Bper-page%5D={}&filters%5Bpagenum%5D=1&filters%5Bmaxpages%5D=1&filters%5Buserid%5D=0&filters%5BshowChannelInfo%5D=1&filters%5Bfilter_time%5D=time_all&filters%5Bfilter_show%5D=show_all&filters%5Bfilter_new_topics%5D=1&isAjaxTemplateRender=true&isAjaxTemplateRenderWithData=true&securitytoken=guest'.format(num_post)
  formData = 'filters%5Bnodeid%5D=0&filters%5Bview%5D=activity&filters%5Bper-page%5D={}&filters%5Bpagenum%5D=1&filters%5Bmaxpages%5D=1&filters%5Buserid%5D=0&filters%5BshowChannelInfo%5D=1&filters%5Bfilter_time%5D=time_today&filters%5Bfilter_show%5D=show_all&filters%5Bfilter_new_topics%5D=1&isAjaxTemplateRender=true&isAjaxTemplateRenderWithData=true&securitytoken=guest'.format(num_post)
  headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
  res = requests.post('https://flutrackers.com/forum/activity/get', headers=headers, data=formData)
  res = json.loads(res.text)

  #ActivityPost object. do anything you want here
  PS = ActivityPost(res['template'], int(res['lastDate']))
  
  if PS.valid_html == False:
    print("No a Valid post html")
    return

  posts = [x for x in PS.get_posts()] 
  sorted_posts = sorted(posts, key=lambda x:x['datestamp'], reverse=True)
  # build a good format dict to store in json

  num_newposts = update_post(sorted_posts, PS)    

  # Now we have the lastest activities urls, I try transfer bash to python
  if num_newposts > 0:
    run_shell = "python"
    for i in range(num_newposts):
      subprocess.call([run_shell, "get_source_content.py",str(i)])
  else:
    print("No new posts\n")

if __name__ == "__main__":
  main()
  

