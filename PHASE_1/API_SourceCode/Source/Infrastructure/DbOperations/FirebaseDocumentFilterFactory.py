from .FirebaseDocumentFilter import FirebaseDocumentFilter


class FirebaseDocumentFilterFactory:
    def make(self, criteria):
        product = FirebaseDocumentFilter()
        if "start_date" in criteria and "end_date" in criteria:
            product.set_date_range(criteria["start_date"], criteria["end_date"])
        if "location" in criteria:
            product.set_location(criteria["location"])
        if "keyterms" in criteria:
            product.set_keyterms(criteria["keyterms"])
        return product