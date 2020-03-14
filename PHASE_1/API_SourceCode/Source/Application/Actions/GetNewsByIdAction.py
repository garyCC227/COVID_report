from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever


class GetNewsByIdAction:

    def __new__(cls, id):
        retriever = FirebaseDocumentRetriever()
        return retriever.get_document_by_id(1)
