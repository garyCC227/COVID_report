from .DomainFactory import DomainFactory
from ..Domain.Report import Report
from ..Domain.Location import Location


class ReportFactory(DomainFactory):
    _product = Report()

    def make(self, data):
        self._product = Report()
        if isinstance(data, dict):
            if "date" in data:
                self._set_date(data['date'])
            if "locations" in data:
                self._set_location_list(data['locations'])
            if "diseases" in data:
                self._set_disease_list(data['diseases'])
            if "syndromes" in data:
                self._set_syndrome_list(data['syndromes'])
        return self._product

    def _set_date(self, date):
        self._product.set_date(date)

    def _set_location_list(self, location):
        if isinstance(location, dict):
            location = Location(location['country'], location['location'])
            self._product.add_location(location)
        elif isinstance(location, Location):
            self._product.add_location(location)
        elif isinstance(location, list):
            for l in location:
                self._set_location_list(l)

    def _set_disease_list(self, disease):
        if isinstance(disease, str):
            self._product.add_disease(disease)
        elif isinstance(disease, list):
            for l in disease:
                self._set_disease_list(l)

    def _set_syndrome_list(self, syndrome):
        if isinstance(syndrome, str):
            self._product.add_syndrome(syndrome)
        elif isinstance(syndrome, list):
            for l in syndrome:
                self._set_syndrome_list(l)
