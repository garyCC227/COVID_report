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

from NLP_PhaseMatcher_version.Location_Checker import Location_Checker
from NLP_PhaseMatcher_version.Geocode_Location import Geocode_Location


def test_location_checker():
    loc = Location_Checker()
    country = loc.get_country("aaa")
    assert(country == None)
    country = loc.get_country("uk")
    assert(country == "UK")
    country = loc.get_country("aa")
    assert(country == None)
    country = loc.get_country("England")
    assert(country == "England")
    country = loc.get_country("china")
    assert(country == "China")

def test_geocode_location():
    geo = Geocode_Location()
    locations = ["wuhan", "sydney, nsw"]
    countries = ["Japan"]
    geo.load_locations_countires(locations, countries)
    keywords = geo.get_location_keywords()
    assert("wuhan" in keywords)
    assert("hubei" in keywords)
    assert("china" in keywords)
    assert("cn" in keywords)
    assert("sydney" in keywords)
    assert("nsw" in keywords)
    assert("au" in keywords)
    assert("australia" in keywords)
    assert("japan" in keywords)
    assert(len(geo.get_locations()) == 3)

def test_duplicated_locations():
    geo = Geocode_Location()
    locations = ["wuhan"]
    countries = ["china", "uk", "united state"]
    geo.load_locations_countires(locations, countries)
    keywords = geo.get_location_keywords()
    assert("wuhan" in keywords)
    assert("china" in keywords)
    assert(len(geo.get_locations()) == 3)