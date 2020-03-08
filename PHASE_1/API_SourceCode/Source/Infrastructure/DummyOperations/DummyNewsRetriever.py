from ...Domain.News import News
from ...Domain.ShortenNews import ShortenNews
from ...DomainFactory.ReportFactory import ReportFactory


class DummyNewsRetriever:

    def get_news_by_id(self, id):
        url = "https://dummy.url.com/"
        time = "2020-02-23T12:12:00"
        title = "Dummy News"
        content = "It's just dummy news :("
        dummy_news = News(id, url, time, title, content)
        dummy_news.set_report(self.get_report_by_id(id))
        return dummy_news

    def get_shorten_news_by_id(self, id):
        url = "https://dummy.url.com/"
        time = "2020-02-23T12:12:00"
        title = "Dummy News"
        content = "It's just dummy news :("
        dummy_news = ShortenNews(id, url, time, title, content)
        return dummy_news

    def get_report_by_id(self, id):
        report_factory = ReportFactory()
        report_data = {
            "id": id,
            "date": "2020-03-06 to 2020-03-08",
            "locations": [
                {
                    "country": "Dummy country 1",
                    "location": "Dummy country 1"
                },
                {
                    "country": "Dummy country 2",
                    "location": "Dummy country 2"
                }
            ],
            "diseases": ["Dummy disease 1"],
            "syndromes": ["Write dummy code for no reason"]
        }
        report = report_factory.make(report_data)
        return report

    def get_news_list(self, all=False):
        result_set = []
        for i in range(5):
            if all:
                result_set.append(self.get_news_by_id(i))
            else:
                result_set.append(self.get_shorten_news_by_id(i))
        return result_set
