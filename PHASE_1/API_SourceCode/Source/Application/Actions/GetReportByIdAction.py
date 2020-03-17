from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever
from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetReportByIdAction:

    def __new__(cls, id):
        #retriever = FirebaseDocumentRetriever()
        retriever = DummyNewsRetriever()
        return retriever.get_report_by_id(id)
