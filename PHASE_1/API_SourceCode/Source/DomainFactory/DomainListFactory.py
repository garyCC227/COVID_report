from .DomainFactory import DomainFactory


class DomainListFactory(DomainFactory):
    _fomain_factory = None

    def __init__(self, domain_factory):
        if (isinstance(domain_factory, DomainFactory)):
            self._domain_factory = domain_factory

    def make(self, data):
        result = []
        for elem in data:
            result.append(self._domain_factory.make(elem))
        return result
