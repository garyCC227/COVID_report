from .News import News


class ShortenNews(News):

    def __init__(self, id, url, date, title, content):
        super().__init__(id, url, date, title, content)

    def get_content(self):
        content = self.get_content
        return (content + '...') if len(content) > 75 else content
