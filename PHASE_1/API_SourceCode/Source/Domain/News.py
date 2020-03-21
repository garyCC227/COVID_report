from .ShortenNews import ShortenNews


class News(ShortenNews):

    def __init__(self, id, url, date, title, content, reports=None, tf=0):
        super().__init__(id, url, date, title, content, tf)
        self._reports = reports

    def get_content(self):
        return self._content

    def get_reports(self):
        return self._reports

    def set_reports(self, reports):
        self._reports = reports

    def to_dict(self):
        result = super().to_dict()
        if self._reports is not None:
            result['reports'] = self.get_reports().to_dict()
        return result
