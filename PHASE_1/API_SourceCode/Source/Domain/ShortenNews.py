from datetime import datetime


class ShortenNews():
    def __init__(self, id, url, date, title, content, tf=0):
        self._id = id
        self._url = url
        self._date = datetime.fromtimestamp(date).strftime('%Y-%m-%d %H:%M:%S')
        self._title = title
        self._content = content
        self._tf = tf

    def get_id(self):
        return self._id

    def get_url(self):
        return self._url

    def get_date(self):
        return self._date

    def get_title(self):
        return self._title

    def get_content(self):
        content = self._content
        return (content[:75] + '...') if len(content) > 75 else content

    def get_tf(self):
        return self._tf

    def to_dict(self):
        return {
            "id": self.get_id(),
            "url": self.get_url(),
            "date_of_publication": self.get_date(),
            "headline": self.get_title(),
            "main_text": self.get_content()
        }
