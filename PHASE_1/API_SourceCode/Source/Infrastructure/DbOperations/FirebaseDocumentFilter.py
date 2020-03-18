import datetime
import time
import os


class FirebaseDocumentFilter:
    _start_date = None
    _end_date = None
    _location = None
    _keyterms = []

    def __init__(self, start=None, end=None, location=None, keyterms=None):
        self.set_date_range(start, end)
        self.set_location(location)
        self.set_keyterms(keyterms)

    def _parse_time(self, t, format='%Y-%m-%dT%H:%M:%S'):
        t = datetime.datetime.strptime(t, format).timetuple()
        return time.mktime(t)

    def set_date_range(self, start, end):
        if start:
            self._start_date = start # self._parse_time(start)
        if end:
            self._end_date = end # self._parse_time(end)

    def set_location(self, location):
        if location:
            self._location = location.lower()
        else:
            self._location = None

    def set_keyterms(self, keyterms):
        if keyterms is None:
            self._keyterms = []
        if isinstance(keyterms, str):
            self._keyterms = keyterms.lower().split(",")
        if isinstance(keyterms, list):
            self._keyterms = keyterms

    def apply(self, query):
        if self._start_date:
            query = query.where(u'date_of_publication', '>', self._start_date)
        if self._end_date:
            query = query.where(u'date_of_publication', '<', self._end_date)
        if self._location:
            query = query.where(u'keyword_location', u'array_contains', self._location)
        for word in self._keyterms:
            query = query.where("keyword_frequency.word" + '[' + word + ']', ">", 0)

        return query
