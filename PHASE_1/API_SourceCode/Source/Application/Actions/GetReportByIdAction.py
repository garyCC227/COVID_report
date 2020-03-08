from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetReportByIdAction:

    def __new__(cls, id):
        retriever = DummyNewsRetriever()
        return retriever.get_report_by_id(1)
