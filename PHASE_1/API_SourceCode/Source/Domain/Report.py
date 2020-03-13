class Report:
    def __init__(self):
        self._date = None
        self._locations = []
        self._diseases = []
        self._syndromes = []

    def get_date(self):
        return self._date

    def get_locations(self):
        return self._locations

    def get_diseases(self):
        return self._diseases

    def get_syndromes(self):
        return self._syndromes

    def set_date(self, date):
        self._date = date

    def add_location(self, location):
        self._locations.append(location)

    def add_disease(self, disease):
        self._diseases.append(disease)

    def add_syndrome(self, syndrome):
        self._syndromes.append(syndrome)

    def to_dict(self):
        result = {}
        if self.get_date() is not None:
            result['date'] = self.get_date()
        if len(self.get_locations()) > 0:
            result['locations'] = self.get_locations()
        if len(self.get_diseases()) > 0:
            result['diseases'] = self.get_diseases()
        if len(self.get_syndromes()) > 0:
            result['syndromes'] = self.get_syndromes()

        return result
