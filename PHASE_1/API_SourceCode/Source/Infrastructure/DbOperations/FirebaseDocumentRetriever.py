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

    def _create_document(self, db_result, shorten=False, with_report=False, keyterms=[]):
        db_result = self._calculate_tf(db_result, keyterms)
        if db_result is None:
            return None
        db_result['content'] = db_result['main_text'] if ('main_text' in db_result) else ""
        db_result['title'] = db_result['headline'] if ('headline' in db_result) else ""
        db_result['date'] = db_result['date_of_publication'] if ('date_of_publication' in db_result) else ""
        factory = NewsFactory(shorten=shorten)
        result = None
        if with_report:
            report = ReportListFactory().make(db_result)
            result = factory.make_with_report(db_result, report)
        else:
            result = factory.make(db_result)
        return result

    def _create_document_list(self, db_result_list, keyterms=[], shorten=True):
        result_set = []
        for d in db_result_list:
            news = self._create_document(d, shorten=shorten, keyterms=keyterms)
            if news:
                result_set.append(news)
        return result_set

    def _tf_key(self, item):
        return item.get_tf()

    def _calculate_tf(self, db_result, keywords=[]):
        flag = True
        tf = 0
        if "keyword_frequency" not in db_result:
            db_result['tf'] = 0
            return db_result

        for word in keywords:
            if word not in db_result['keyword_frequency']:
                flag = False
                break
            else:
                tf += db_result['keyword_frequency'][word]
        if not flag:
            return None
        else:
            db_result['tf'] = tf
            return db_result

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
        handler = lambda elem: self._create_document(elem)
        result_list = FirebaseListFactory().make(query)
        result_list = self._create_document_list(result_list, filter.get_keyterms(), shorten=not complete_version)
        result_list = sorted(result_list, key=self._tf_key, reverse=True)
        return result_list

    def get_report_by_id(self, id):
        db = firestore.client()

        doc_ref = db.collection(u'reports').document(id)
        doc = doc_ref.get()
        result = doc.to_dict()
        if not result:
            raise ReportNotFoundException()
        result['id'] = doc.id
        return ReportListFactory().make(result)
