from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetNewsByIdAction:

    def __new__(cls, id):
        retriever = DummyNewsRetriever()
        return retriever.get_news_by_id(1)
