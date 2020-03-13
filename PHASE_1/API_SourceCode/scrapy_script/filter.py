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

  def get_source_text_by_p(self):
    texts = self.soup.findAll('p')
    content = ""
    for text in texts:
      content = content + text.text.strip()
    
    return content


if __name__ == '__main__':
  file = input("Type the file name or Just Enter to use default file\n")
  if file == '':
    file = '824507-australia-2019-ncov-cases-news-information.html'
  filter = Filter(file)
  for post in filter.get_all_posts():
    print(post)
  
  print('There are {} posts'.format(len(filter.get_all_posts())))