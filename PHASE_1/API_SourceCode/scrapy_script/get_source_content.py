import json
import validators
import sys

from last_activity import ActivityPost


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
  url = post['url']
  post_content = post['flu_trackers_post_content']
  if not validators.url(url):
    return
    
  content = ActivityPost.get_source_text_for_onepost(url)
  store[nodeid] = content


  with open('content.json', 'w') as f:
    json.dump(store, f, default = lambda o: o.__dict__, sort_keys=True, indent=4)



if __name__ == "__main__":
  # print(sys.argv[1])
  main()