from abc import ABC


class DomainFactory(ABC):
    _product = None

    def make(self, data):
        return self._product
