from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever


class GetNewsListAction:

    def __new__(cls, all=False):
        retriever = FirebaseDocumentRetriever()
        return retriever.get_all_documents(complete_version=all)
