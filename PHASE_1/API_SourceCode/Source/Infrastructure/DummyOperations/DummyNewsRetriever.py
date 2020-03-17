from ...Domain.News import News
from ...Domain.ShortenNews import ShortenNews
from ...DomainFactory.ReportListFactory import ReportListFactory


class DummyNewsRetriever:

    def get_news_by_id(self, id):
        url = "https://dummy.url.com/"
        time = "2020-02-23 12:12:00"
        title = "Dummy News"
        content = "It's just dummy news :("
        dummy_news = News(id, url, time, title, content)
        dummy_news.set_reports(self.get_report_by_id(id))
        return dummy_news

    def get_shorten_news_by_id(self, id):
        url = "https://dummy.url.com/"
        time = "2020-02-23 12:12:00"
        title = "Dummy News"
        content = "It's just dummy news :("
        dummy_news = ShortenNews(id, url, time, title, content)
        return dummy_news

    def get_report_by_id(self, id):
        report_factory = ReportListFactory()
        report_data = [{
            "id": id,
            "event_date": "2020-03-06 to 2020-03-08",
            "locations": [
                {
                    "google_id": "string",
                    "address": "Dummy country 1"
                },
                {
                    "google_id": "string",
                    "address": "Dummy country 2"
                }
            ],
            "diseases": ["Dummy disease 1"],
            "syndromes": ["Write dummy code for no reason"]
        }]
        report = report_factory.make(report_data)
        return report

    def get_all_documents(self, complete_version=False):
        result_set = []
        for i in range(5):
            if complete_version:
                result_set.append(self.get_news_by_id(str(i)))
            else:
                result_set.append(self.get_shorten_news_by_id(str(i)))
        return result_set
