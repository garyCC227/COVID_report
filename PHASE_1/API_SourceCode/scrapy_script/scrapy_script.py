import scrapy
from scrapy.crawler import CrawlerProcess

'''
Explanation:
  1. store urls text into urls.txt
  2. run the spider by reading all urls from urls.txt
  3. store the page as html format
  4. TODO:use beautifulsoup to play with the html page

'''

DEFAULT_URLS = [
    'https://flutrackers.com/forum/forum/-2019-ncov-new-coronavirus/australia-2019-ncov/824507-australia-2019-ncov-cases-news-information/page3']
# crawler object
process = CrawlerProcess(settings={
    'FEED_FORMAT': 'csv',
    'FEED_URI': 'temp.csv'
})

# store urls into urls.txt


def store_urls(urls=DEFAULT_URLS):
  # store urls into urls.txt
  with open("urls.txt", "w") as f:
    for url in urls:
      f.write("{}\n".format(url))


class MySpider(scrapy.Spider):
  name = "myspider"
  allowed_domains = ['flutrackers.com']
  start_urls = []

  def __init__(self):
    for line in open('./urls.txt', 'r').readlines():
      self.allowed_domains.append(line)
      self.start_urls.append('%s' % line)

  def parse(self, response):
    page = response.url.split("/")[-2]
    filename = '%s.html' % page
    with open(filename, 'wb') as f:
      f.write(response.body)
    self.log('Saved file %s' % filename)


def main():
  urls = []
  while True:
    url = input(
        "Type a valid url address. Type 'q' to finish.(if you want the default url, just type 'q' at the start)\n")
    print(url)
    if url.strip() == 'q':
      break
    urls.append(url)

  # store all urls into urls.txt
  if len(urls) > 0:
    store_urls(urls)
  else:
    store_urls()
  # runing the spider
  process.crawl(MySpider)
  process.start()
  process.stop()  # might be unneccseary


if __name__ == "__main__":
  main()
