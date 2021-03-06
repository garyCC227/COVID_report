import requests 
import json 
import datetime
from bs4 import BeautifulSoup
from scrapy.crawler import CrawlerProcess
import scrapy
import os
import sys
from pathlib import Path
import re

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))
for root, dirs, files in os.walk(".."):
    for d in dirs:
        if re.search("API_SourceCode$",os.path.abspath(os.path.join(root, d))):
            sourcepath = os.path.abspath(os.path.join(root, d))
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))


from .scrapy_script import scrapping
from .filter import Filter

'''
what this script does:
  scrapping the latest activity posts from flu-trackers.

Explanation:
  please read the comment in main()
'''

headers = {
  'Content-Type':'application/x-www-form-urlencoded'
}

class ActivityPost(object):
  def __init__(self, html, last_date):
    self.html = html
    self.soup = BeautifulSoup(html, features='lxml')
    self.last_datestamp = last_date
    self.last_date = datetime.datetime.fromtimestamp(last_date) 
  
  @property
  def num_posts(self):
    posts = self.soup.findAll('li',{"class":"b-post"})
    return len(posts)
  
  @property
  def valid_html(self):
    return bool(BeautifulSoup(self.html, "html.parser").find())

  def get_posts(self, count=-1):
    posts = self.soup.findAll('li',{"class":"b-post"})
    for post in posts:
      # we will fetch all the post content 
      nodeid = post['data-node-id']
      content, url = self.post_all_content_and_url(nodeid)

      date = ""
      if post.find('time') != None:
        date = post.find('time')['datetime']
      result = {
        "date": date,
        "datestamp":post['data-node-publishdate'],
        "nodeid": nodeid,
        "flu_trackers_post_content" : content,
        "url":url
      }
      yield result
    
  def post_all_content_and_url(self, nodeid):
    params ="nodeid={}&securitytoken=guest".format(nodeid)
    res = requests.post("https://flutrackers.com/forum/activity/fetchText",headers=headers, data=params)
    res = json.loads(res.text)
    full_content = BeautifulSoup(res['nodeText'], features='lxml')
    
    source_url = ""
    if full_content.find('a') != None:
      source_url = full_content.find('a')['href']
    content = full_content.text.strip()
    
    return content, source_url
  
  '''
  Enter the url, we will get all the text from that url.
  by filter <p>
  '''
  @classmethod
  def get_source_text_for_onepost(cls, url):
    '''
    scrapping the html page
    '''
    scrapping(url)
    
    '''
    filter text from source url
    '''
    
    filename = Path(sourcepath,'Scrapy/temp.html') #consistent file name
    flter = Filter(filename)
    
    return flter.get_source_text_by_p()


if __name__ == "__main__":
  
  # set up request
  num_post = input("how many posts you wanna get??\n")
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

  # ignore below. blow for setting up last mouth posts 

  # # store into posts.json file
  # data = {
  #   "posts" : sorted_posts,
  #   "count" : PS.num_posts,
  #   "lastDatestamp": PS.last_datestamp,
  #   "date": str(PS.last_date)
  # }
  # # TODO: comment this line, no updating posts.json

  # with open('posts.json', 'w') as f:
  #     json.dump(data, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)

  # # test, use the first post to get the source_url content
  # for post in data["posts"]:
  #   if post["url"] != "":
  #      PS.get_source_text_for_onepost(post["url"])
  #      break
      