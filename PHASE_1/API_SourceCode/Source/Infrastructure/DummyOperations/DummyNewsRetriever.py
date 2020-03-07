from ...Domain.News import News


class DummyNewsRetriever:

    def get_news_by_id(self, id):
        url = "https://dummy.url.com/"
        time = "2020-02-23T12:12:00"
        title = "Dummy News"
        content = "It's just dummy news :("
        dummy_news = News(id, url, time, title, content)
        return dummy_news.to_dict()

    def get_news_list(self):
        result_set = []
        for i in range(5):
            result_set.append(self.get_news_by_id(i))

        return result_set
