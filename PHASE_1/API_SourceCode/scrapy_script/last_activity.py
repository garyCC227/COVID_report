import requests 
import json 
import datetime
from bs4 import BeautifulSoup


'''
what this script does:
  scrapping the latest activity posts from flu-trackers.

Explanation:
  please read the comment in main()
'''


class ActivityPost(object):
  def __init__(self, html, last_date):
    self.soup = BeautifulSoup(html, features='lxml')
    self.last_datestamp = last_date
    self.last_date = datetime.datetime.fromtimestamp(last_date) 
  
  @property
  def num_posts(self):
    posts = PS.soup.findAll('div', {"class":"b-post__hide-when-deleted"})
    return len(posts)
  
  def get_posts(self, count=-1):
    posts = PS.soup.findAll('div', {"class":"b-post__hide-when-deleted"})
    for post in posts:
      result = {
        "date": post.find('time')['datetime'],
        "content" : post.find('div', {"class":"post-content"}).text
      }
      yield result
      
      

if __name__ == "__main__":
  # set up request
  num_post = input("how many posts you wanna get??\n")
  formData = 'filters%5Bnodeid%5D=0&filters%5Bview%5D=activity&filters%5Bper-page%5D={}&filters%5Bpagenum%5D=1&filters%5Bmaxpages%5D=20&filters%5Buserid%5D=0&filters%5BshowChannelInfo%5D=1&filters%5Bfilter_time%5D=time_lastmonth&filters%5Bfilter_show%5D=show_all&filters%5Bfilter_new_topics%5D=1&isAjaxTemplateRender=true&isAjaxTemplateRenderWithData=true&securitytoken=guest'.format(num_post)
  headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
  res = requests.post('https://flutrackers.com/forum/activity/get', headers=headers, data=formData)
  res = json.loads(res.text)

  #ActivityPost object. do anything you want here
  PS = ActivityPost(res['template'], int(res['lastDate']))

  # store into posts.json file
  data = {
    "posts" : [x for x in PS.get_posts()],
    "count" : PS.num_posts,
    "lastDatestamp": PS.last_datestamp,
    "date": str(PS.last_date)
  }
  with open('posts.json', 'w') as f:
      json.dump(data, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)
      