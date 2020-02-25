from bs4 import BeautifulSoup


class Filter(object):
  def __init__(self, file):
    f = open(file, 'r', encoding='utf-8', errors='ignore')
    self.soup = BeautifulSoup(f.read(), 'html.parser')

  #IMPORTANT ASSUMPOTION: all post have 'js-post__content-text' class
  def get_all_posts(self):
    #filter all the post
    posts = self.soup.findAll('div', {"class":"js-post__content-text"})
    return [post.text.strip() for post in posts]




if __name__ == '__main__':
  file = '824507-australia-2019-ncov-cases-news-information.html'
  filter = Filter(file)
  for post in filter.get_all_posts():
    print(post)
  
  print('There are {} posts'.format(len(filter.get_all_posts())))