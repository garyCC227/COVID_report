class ShortenNews():

    def __init__(self, id, url, date, title, content):
        self._id = id
        self._url = url
        self._date = date
        self._title = title
        self._content = content

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
        return (content + '...') if len(content) > 75 else content

    def to_dict(self):
        return {
            "id": self.get_id(),
            "url": self.get_url(),
            "title": self.get_title(),
            "content": self.get_content()
        }