from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever


class GetReportByIdAction:

    def __new__(cls, id):
        retriever = FirebaseDocumentRetriever()
        return retriever.get_report_by_id(1)
