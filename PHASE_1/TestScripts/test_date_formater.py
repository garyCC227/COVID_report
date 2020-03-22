import pytest
import sys
import os
import json
from langdetect import detect
from pathlib import Path
import re

for root, dirs, files in os.walk(".."):
    for d in dirs:
        # if re.search("/API_SourceCode$",os.path.abspath(os.path.join(root, d))):
        sys.path.insert(0, os.path.abspath(os.path.join(root, d)))

from NLP_PhaseMatcher_version.Date_Formater import Date_Formater

def test_single_date_normal_format():
    d = Date_Formater("2020", 1)
    date = "2020-12-12"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "2020  12  12"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "2020/12/12"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "2020.12.12"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "2020--12--12"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "12--12--2020"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "12-12-2020"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "12 12 2020"
    assert(["2020-12-12 xx:xx:xx"] == d.match_date(date))
    date = "2018"
    assert(["2018-xx-xx xx:xx:xx"] == d.match_date(date))

#test different format represent date
def test_single_date_riched_format() :
    d = Date_Formater("2020", 3)
    date = "Feb 20"
    assert(["2020-02-20 xx:xx:xx"] == d.match_date(date))
    date = "Feb 20,2019"
    assert(["2019-02-20 xx:xx:xx"] == d.match_date(date))
    date = "Feb 20 th,2019"
    assert(["2019-02-20 xx:xx:xx"] == d.match_date(date))
    date = "Feb 20th,2019"
    assert(["2019-02-20 xx:xx:xx"] == d.match_date(date))
    date = "MAR 20,2019"
    assert(["2019-03-20 xx:xx:xx"] == d.match_date(date))
    date = "2019 dec"
    assert(["2019-12-xx xx:xx:xx"] == d.match_date(date))
    date = "2020 dec"
    assert(["2020-12-xx xx:xx:xx"] == d.match_date(date))
    date = "dec"
    assert(["2019-12-xx xx:xx:xx"] == d.match_date(date))
    date = "Janoury"
    assert(["2020-01-xx xx:xx:xx"] == d.match_date(date))
    date = "Janoury 1"
    assert(["2020-01-01 xx:xx:xx"] == d.match_date(date))

def test_date_period() :
    d = Date_Formater("2020", 3)
    date = "January 1-5"
    assert(["2020-01-01 xx:xx:xx", "2020-01-05 xx:xx:xx"] == d.match_date(date))
    date = "jan  2-25"
    assert(["2020-01-02 xx:xx:xx", "2020-01-25 xx:xx:xx"] == d.match_date(date))
    date = "dec  8 to 25, 2019"
    assert(["2019-12-08 xx:xx:xx", "2019-12-25 xx:xx:xx"] == d.match_date(date))

# ignore error date
def test_error_date_ignored() :
    d = Date_Formater("2020", 3)
    date = "0768"
    assert(["2020-xx-xx xx:xx:xx"] == d.match_date(date))
    date = "aseeee"
    assert(["2020-xx-xx xx:xx:xx"] == d.match_date(date))
    date = "border : 6px"
    assert(["2020-xx-xx xx:xx:xx"] == d.match_date(date))

def test_time() :
    d = Date_Formater("2020", 3)
    time = "19:12"
    assert("19:12:xx" == d.match_time(time))
    time = "07:12"
    assert("07:12:xx" == d.match_time(time))
    time = "7:12 pm"
    assert("19:12:xx" == d.match_time(time))
    time = "7:12 am"
    assert("07:12:xx" == d.match_time(time))
    time = "7 am"
    assert("07:xx:xx" == d.match_time(time))
    time = "7pm"
    assert("19:xx:xx" == d.match_time(time))

def test_error_time_ignored() :
    d = Date_Formater("2020", 3)
    date = "aseeee"
    assert(None == d.match_time(date))
    date = "border:xx"
    assert(None == d.match_time(date))

def test_return_exact_date_1() :
    d = Date_Formater("2020", 3)
    d.add_date("2020")
    d.add_date("Feb 20")
    d.add_date("feburary 2020")
    assert("2020-02-20 xx:xx:xx" == d.get_event_date())

def test_return_exact_date_2() :
    d = Date_Formater("2020", 3)
    d.add_date("Feb 20")
    d.add_date("2020")
    assert("2020-02-20 xx:xx:xx" == d.get_event_date())

def test_return_date_range_1() :
    d = Date_Formater("2020", 3)
    d.add_date("Feb 20")
    d.add_date("2020/01/02")
    d.add_date("2020/01/08")
    d.add_date("march 2019")
    d.add_date("april 2019")
    assert("2019-03-xx xx:xx:xx to 2020-02-20 xx:xx:xx" == d.get_event_date())

def test_return_date_range_2() :
    d = Date_Formater("2020", 3)
    d.add_date("1888")
    d.add_date("2020/01/02")
    d.add_date("2020/01/08")
    d.add_date("march 2019")
    d.add_date("april 2019")
    d.add_date("2019-01-03")
    d.add_date("may 2020")
    assert("2019-01-03 xx:xx:xx to 2020-05-xx xx:xx:xx" == d.get_event_date())

def test_return_date_add_time_1() :
    d = Date_Formater("2020", 3)
    d.add_date("Feb 20")
    d.add_date("2020")
    d.add_time("7 am")
    assert("2020-02-20 07:xx:xx" == d.get_event_date())

def test_return_date_add_time_2() :
    d = Date_Formater("2020", 3)
    d.add_date("1888")
    d.add_date("2020/01/02")
    d.add_time("15:00")
    d.add_date("2020/01/08")
    d.add_date("march 2019")
    d.add_date("april 2019")
    d.add_date("2019-01-03")
    d.add_date("may 2020")
    d.add_time("19:00")
    assert("2019-01-03 19:00:xx to 2020-05-xx xx:xx:xx" == d.get_event_date())