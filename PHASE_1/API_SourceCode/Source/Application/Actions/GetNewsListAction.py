from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetNewsListAction:

    def __new__(cls):
        retriever = DummyNewsRetriever()
        return retriever.get_news_list()
