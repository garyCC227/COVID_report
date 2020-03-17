from .FirebaseListFactory import FirebaseListFactory
from .FirebaseDocumentFilterFactory import FirebaseDocumentFilterFactory
from ...DomainFactory.ReportListFactory import ReportListFactory
from ...DomainFactory.ReportFactory import ReportFactory
from ...DomainFactory.NewsFactory import NewsFactory
from ...Domain.Exceptions.NewsNotFoundException import NewsNotFoundException
from ...Domain.Exceptions.ReportNotFoundException import ReportNotFoundException
from firebase_admin import firestore


class FirebaseDocumentRetriever():
    _criteria = {}
    def __init__(self, filter_criteria={}):
        self._criteria = filter_criteria

    def _create_document(self, db_result, shorten=False, with_report=False):
        db_result['content'] = db_result['main_text'] if ('main_text' in db_result) else ""
        db_result['title'] = db_result['headline'] if ('headline' in db_result) else ""
        db_result['date'] = db_result['date_of_publication'] if ('date_of_publication' in db_result) else ""
        factory = NewsFactory(shorten=shorten)
        if with_report:
            report = ReportListFactory().make(db_result)
            return factory.make_with_report(db_result, report)
        else:
            return factory.make(db_result)

    def get_document_by_id(self, id):
        db = firestore.client()

        doc_ref = db.collection(u'reports').document(id)
        doc = doc_ref.get()
        result = doc.to_dict()
        if not result:
            raise NewsNotFoundException()
        result['id'] = doc.id
        return self._create_document(result, with_report=True)

    def get_all_documents(self, complete_version=False):
        filter = FirebaseDocumentFilterFactory().make(self._criteria)
        db = firestore.client()
        query = db.collection(u'reports')
        query = filter.apply(query)
        handler = lambda elem: self._create_document(elem, shorten=not complete_version)
        result_list = FirebaseListFactory().make(query)
        return list(map(handler, result_list))

    def get_report_by_id(self, id):
        db = firestore.client()

        doc_ref = db.collection(u'reports').document(id)
        doc = doc_ref.get()
        result = doc.to_dict()
        if not result:
            raise ReportNotFoundException()
        result['id'] = doc.id
        return ReportListFactory().make(result)
