from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever
from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetNewsByIdAction:

    def __new__(cls, id):
        # retriever = FirebaseDocumentRetriever()
        retriever = DummyNewsRetriever()
        return retriever.get_document_by_id(id)
