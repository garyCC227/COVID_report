import json
import requests
import re

class Geocode_Location:

    def __init__(self, google_api_key = "AIzaSyD9uzu87hhGsu6Wh7C2-7F8tO2WIWWA5bY") :
        self.google_api_key = google_api_key
        self.location_keywords = []
        self.locations = []
    
    def get_location_keywords(self) :
        return self.location_keywords

    def get_locations(self) :
        return self.locations
    
    def load_locations_countires(self, locations, countries) :
        for location in locations :
            self.send_request(location)
        
        for location in countries :
            self.send_request(location)

    def send_request(self, location) :
        location = location.lower()
        location = location.replace(" ","+")
        if location in self.location_keywords :
            return
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + self.google_api_key
        response = requests.get(url)
        if response.status_code == 200 :
            result = json.loads(response.text)
            for obj in result["results"][0]["address_components"] :
                temp = obj["long_name"].lower()
                ignore_pure_number = re.search("^[0-9]+&",temp)
                if ignore_pure_number != None :
                    continue
                if temp not in self.location_keywords :
                    self.location_keywords.append(obj["long_name"].lower())
                temp  = obj["short_name"].lower()
                ignore_pure_number = re.search("^[0-9]+&",temp)
                if ignore_pure_number != None :
                    continue
                if temp not in self.location_keywords :
                    self.location_keywords.append(obj["short_name"].lower())
        dic = {}
        dic["google_id"] = result["results"][0]["place_id"]
        dic["address"] = result["results"][0]["formatted_address"]
        self.locations.append(dic)