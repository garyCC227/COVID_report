import spacy
import re
import json
import time
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))

from spacy.matcher import PhraseMatcher
from Date_Formater import Date_Formater
from Location_Checker import Location_Checker
from Geocode_Location import Geocode_Location

# You can alter the path of disease_pattern_loc, search_pattern_loc, syndrome_pattern_loc when creating NLP_Processer object
# You should call make_reports function to get reports json
# Sample usage is at the bottom


class NLP_Processer :

    def __init__ (self, disease_pattern_loc = os.path.join("NLP_PhaseMatcher_version","disease_pattern.json") , search_pattern_loc = os.path.join("NLP_PhaseMatcher_version","search_pattern.json"), 
                    syndrome_pattern_loc = os.path.join("NLP_PhaseMatcher_version","syndrome_pattern.json"), geocode_service = True):
    # Yahnis windows' version
    # def __init__ (self, disease_pattern_loc = "disease_pattern.json" , search_pattern_loc = "search_pattern.json", 
    #                 syndrome_pattern_loc = "syndrome_pattern.json", geocode_service = True):
        self.disease_pattern_loc = disease_pattern_loc
        self.search_pattern_loc = search_pattern_loc
        self.syndrome_pattern_loc = syndrome_pattern_loc
        self.geocode_service = geocode_service
        self.nlp = spacy.load('en_core_web_sm')
        self.matcher = PhraseMatcher(self.nlp.vocab, attr='LOWER', max_length=5)
        self.load_pattern(self.disease_pattern_loc)
        self.load_pattern(self.syndrome_pattern_loc)
        self.load_search_pattern(self.search_pattern_loc)
        self.location_checker = Location_Checker()
        self.publication_date = "2020-xx-xx xx:xx:xx"
        self.keyword_location = []
        self.keyword_frequency = []
        self.keyword_list = []

    def set_publication_date(self, date) :
        self.publication_date = date

    def get_keyword_location(self) :
        return self.keyword_location
    
    def get_keyword_frequency(self) :
        return self.keyword_frequency
    
    def get_keyword_list(self) :
        return self.keyword_list

    def load_pattern(self,location) :
        with open(location) as f:
            datas = json.load(f)
        f.close()

        for  data in datas:
            name = data["name"]
            general_names = data["general_names"]
            patterns = [self.nlp.make_doc(text) for text in general_names]
            self.matcher.add(name, None, *patterns)

    def load_search_pattern(self,location) :
        with open(location) as f:
            data = json.load(f)
        f.close()
        patterns = [self.nlp.make_doc(text) for text in data["keywords"]]
        self.matcher.add(data["name"], None, *patterns)
    
    def make_reports(self, text) :
        doc = self.nlp(text)
        matches = self.matcher(doc)
        text_length = len([token.text for token in doc])
        disease_dic = {}
        syndrome_dic = {}
        search_dic = {}
        for match_id, start, end in matches:
            category = self.nlp.vocab.strings[match_id]
            span = doc[start:end]
            temp = re.search("^([A-Z]{3})-(.+)$",category)
            # print(category + "  " + span.text)
            if temp == None :
                if str(span).lower() in search_dic :
                    search_dic[str(span).lower()] +=1
                else :
                    search_dic[str(span).lower()] = 1
            elif temp.group(1) == "DIS" :
                if temp.group(2) in disease_dic :
                    disease_dic[temp.group(2)] +=1
                else :
                    disease_dic[temp.group(2)] = 1
            elif temp.group(1) == "SYN" :
                if temp.group(2) in syndrome_dic :
                    syndrome_dic[temp.group(2)] +=1
                else :
                    syndrome_dic[temp.group(2)] = 1
        # At this stage disease and syndrome parts are done
        temp = dict(disease_dic, **syndrome_dic)
        keyword_dic = dict(temp,**search_dic)
        keyword_dic = dict(sorted(keyword_dic.items(), key=lambda kv: kv[1], reverse=True))
        keyword_dic = dict((k.lower(), round(v/text_length,8)) for k,v in keyword_dic.items())
        #This is for date and location
        temp = re.search("^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$", self.publication_date)
        if temp == None :
            print ("error error error nlp processer publication date!")
        else :
            test = Date_Formater(year = temp.group(1), month = int(temp.group(2)))
        country_dic = {}
        location_dic = {}
        for ent in doc.ents:
            text = ent.text
            if ent.label_ == "TIME" :
                test.add_time(text)
            elif ent.label_ == "DATE" or ent.label_ == "ORG" :
                test.add_date(text)
            elif ent.label_ == "GPE" :
                text = text.replace(".","")
                country = self.location_checker.get_country(text)
                if country == None :
                    temp = re.search("[0-9]|:|;|\(|\)|\"|\'|\\|\/|@|Discover|\`|\=|\+|\?|\!", text)
                    if temp == None and len(text) > 3:
                        if text in location_dic :
                            location_dic[text] += 1
                        else :
                            location_dic[text] = 1
                else :
                    if country in country_dic :
                        country_dic[country] += 1
                    else :
                        country_dic[country] = 1
        # convert to json
        location_handler = Geocode_Location()
        if self.geocode_service :
            location_handler.load_locations_countires(sorted(location_dic.keys()), sorted(country_dic.keys()))
        report = {}
        report["event_date"] = test.get_event_date()
        if self.geocode_service :
            report["locations"] = location_handler.get_locations()
        else :
            l = []
            for country in sorted(country_dic.keys()) :
                d = {}
                d["country"] = country
                d["location"] = ""
                l.append(d)
            self.keyword_location = l
        report["diseases"] = sorted(disease_dic.keys())
        report["syndromes"] = sorted(syndrome_dic.keys())
        if self.geocode_service :
            self.keyword_location = sorted(location_handler.get_location_keywords())
        self.keyword_frequency = keyword_dic
        self.keyword_list = sorted(keyword_dic.keys())
        reports = []
        reports.append(report)
        return reports




# # Sample usage
# # switch to false if you don not need google geocode service
# # or testing a huge bulk of data
# a = NLP_Processer(geocode_service = True)
# with open('./content.json') as f:
#     data = json.load(f)
# f.close()
# i = -1
# t1 = time.time()
# for b in data :
#     i+=1
#     if i < 335 :
#         continue
#     print("\n")
#     # print out main text
#     # print(data[b])
#     json_object = a.make_reports(data[b])
#     json_formatted_str = json.dumps(json_object, indent=2)
#     # print out the captured report
#     print(json_formatted_str)
#     print("\n\n")
#     if i > 355 :
#         break

# t2 = time.time()        
# print("%.3f seconds" % (t2 - t1))

