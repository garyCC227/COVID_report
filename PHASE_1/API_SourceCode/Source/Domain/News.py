from .ShortenNews import ShortenNews


class News(ShortenNews):

    def __init__(self, id, url, date, title, content, report=None):
        super().__init__(id, url, date, title, content)
        self._report = report

    def get_content(self):
        return self._content

    def get_report(self):
        return self._report

    def set_report(self, report):
        self._report = report

    def to_dict(self):
        result = super().to_dict()
        if self._report is not None:
            result['report'] = self.get_report()
        return result