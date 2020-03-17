from ...Infrastructure.DbOperations.FirebaseDocumentRetriever import FirebaseDocumentRetriever
from ...Infrastructure.DummyOperations.DummyNewsRetriever import DummyNewsRetriever


class GetNewsListAction:

    def __new__(cls, all=False, params=None):
        filter = {}
        if params.get('start_date'):
            filter['start_date'] = params.get('start_date')
        if params.get('end_date'):
            filter['end_date'] = params.get('end_date')
        if params.get('location'):
            filter['location'] = params.get('location')
        if params.get('keyterms'):
            filter['keyterms'] = params.get('keyterms')
        #retriever = FirebaseDocumentRetriever(filter_criteria=filter)
        # retriever = FirebaseDocumentRetriever()
        retriever = DummyNewsRetriever()
        return retriever.get_all_documents(complete_version=all)
