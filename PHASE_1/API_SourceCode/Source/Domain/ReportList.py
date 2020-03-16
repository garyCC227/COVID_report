from .Report import Report


class ReportList:
    _list = []

    def __init__(self):
        self._list = []

    def add(self, report):
        if isinstance(report, Report):
            self._list.append(report)

    def get_list(self):
        return self._list

    def to_dict(self):
        result = []
        for elem in self.get_list():
            result.append(elem.to_dict())
        return result
