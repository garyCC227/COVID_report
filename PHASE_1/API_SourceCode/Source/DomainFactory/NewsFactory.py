from .DomainFactory import DomainFactory
from ..Domain.News import News
from ..Domain.ShortenNews import ShortenNews
from ..Domain.ReportList import ReportList


class NewsFactory(DomainFactory):
    _product = None
    _shorten = False

    def __init__(self, shorten=False):
        self._shorten = shorten

    def make(self, data):
        id = None
        date = None
        url = None
        title = None
        content = None
        if isinstance(data, dict):
            if "id" in data:
                id = data['id']
            if "date" in data:
                date = data['date']
            if "url" in data:
                url = data['url']
            if "title" in data:
                title = data['title']
            if "content" in data:
                content = data['content']

        if not self._shorten:
            self._product = News(id, url, date, title, content)
        else:
            self._product = ShortenNews(id, url, date, title, content)

        return self._product

    def make_with_report(self, data, report):
        if isinstance(report, ReportList):
            self.make(data)
            self._product.set_reports(report)
        return self._product
