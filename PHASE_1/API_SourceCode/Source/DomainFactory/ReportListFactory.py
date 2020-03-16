from .DomainFactory import DomainFactory
from .ReportFactory import ReportFactory
from ..Domain.ReportList import ReportList


class ReportListFactory(DomainFactory):
    _product = ReportList()
    _report_factory = None

    def __init__(self):
        self._product = ReportList()
        self._report_factory = ReportFactory()

    def make(self, data):
        if isinstance(data, list):
            for elem in data:
                self._product.add(self._report_factory.make(elem))
        if isinstance(data, dict):
            if "reports" in data and isinstance(data['reports'], list):
                self.make(data['reports'])
            if "report" in data and isinstance(data['report'], list):
                self.make(data['report'])
        return self._product
