import datetime
import time
import os


class Filter:
    _list = []
    _start_date = None
    _end_date = None
    _location = None
    _keyterms = []

    def __init__(self, list):
        self._list = list

    def _parse_time(self, t, format='%Y-%m-%dT%H:%M:%S'):
        t = datetime.datetime.strptime(t, format).timetuple()
        return time.mktime(t)

    def set_date_range(self, start, end):
        self._start_date = self._parse_time(start)
        self._end_date = self._parse_time(end)

    def set_location(self, location):
        self._location = location.lower()

    def set_keyterms(self, keyterms):
        self._keyterms = keyterms.lower().split(",")

    def execute(self):
        result = []
        for a in self._list:
            if self._start_date and self._end_date and 'date_of_publication' in a:
                d = a['date_of_publication'].replace("x", "0").replace("T", " ")
                pub_time = self._parse_time(d, '%Y-%m-%d %H:%M:%S')
                if pub_time < self._start_date or pub_time > self._end_date:
                    continue

            if self._location:
                flag = False
                for r in a['reports']:
                    for l in r['locations']:
                        if self._location in l['address'].lower():
                            flag = True
                            break
                    if flag:
                        break
                if not flag:
                    continue

            if self._keyterms:
                flag = True
                for word in self._keyterms:
                    if not word in a['keyword_list']:
                        flag = False
                        break
                if not flag:
                    continue
            result.append(a)

        return result
