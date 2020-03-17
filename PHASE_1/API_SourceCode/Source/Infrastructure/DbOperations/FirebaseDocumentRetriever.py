from .FirebaseListFactory import FirebaseListFactory
from .Filter import Filter
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

    def _create_filter(self, list):
        product = Filter(list)
        if "start_date" in self._criteria and "end_date" in self._criteria:
            product.set_date_range(self._criteria["start_date"], self._criteria["end_date"])
        if "location" in self._criteria:
            product.set_location(self._criteria["location"])
        if "keyterms" in self._criteria:
            product.set_location(self._criteria["keyterms"])
        return product

    def get_document_by_id(self, id):
        db = firestore.client()

        doc_ref = db.collection(u'reports').document(id)
        doc = doc_ref.get()
        result = doc.to_dict()
        if not result:
            raise NewsNotFoundException()
        result['id'] = doc.id
        return self._create_document(result, with_report=True)

    def get_documents_by_location(self, location):
        db = firestore.client()
        query = db.collection(u'reports').where(u'locations', u'array_contains', location)
        handler = lambda elem: self._create_document(elem, shorten=True)
        result_list = FirebaseListFactory().make(query)
        return list(map(handler, result_list))

    def get_documents_by_syndrome(self, syndrome):
        db = firestore.client()
        query = db.collection(u'reports').where(u'syndromes', u'array_contains', syndrome)
        handler = lambda elem: self._create_document(elem, shorten=True)
        result_list = FirebaseListFactory().make(query)
        return list(map(handler, result_list))

    def get_documents_by_disease(self, disease):
        db = firestore.client()
        query = db.collection(u'reports').where(u'diseases', u'array_contains', disease)
        handler = lambda elem: self._create_document(elem, shorten=True)
        result_list = FirebaseListFactory().make(query)
        return list(map(handler, result_list))

    def get_all_documents(self, complete_version=False):
        db = firestore.client()
        query = db.collection(u'reports')
        handler = lambda elem: self._create_document(elem, shorten=not complete_version)
        result_list = FirebaseListFactory().make(query)
        result_list = self._create_filter(result_list).execute()
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
