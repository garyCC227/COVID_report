import spacy
import re
import json
from spacy.matcher import PhraseMatcher
from Date_Formater import Date_Formater
from Location_Checker import Location_Checker

class NLP_Processer :

    def __init__ (self, disease_pattern_loc = "./disease_pattern.json" , search_pattern_loc = "./search_pattern.json", 
                    syndrome_pattern_loc = "./syndrome_pattern.json"):
        self.disease_pattern_loc = disease_pattern_loc
        self.search_pattern_loc = search_pattern_loc
        self.syndrome_pattern_loc = syndrome_pattern_loc
        self.nlp = spacy.load('en_core_web_sm')
        self.matcher = PhraseMatcher(self.nlp.vocab, attr='LOWER', max_length=5)
        self.load_pattern(self.disease_pattern_loc)
        self.load_pattern(self.syndrome_pattern_loc)
        self.load_search_pattern(self.search_pattern_loc)
        self.location_checker = Location_Checker()

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
        #This is for date and location
        test = Date_Formater()
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
                    temp = re.search("([0-9]|:|;)", text)
                    if temp == None :
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

        # diseases_json = json.dumps(sorted(disease_dic.keys()))
        # syndromes_json = json.dumps(sorted(syndrome_dic.keys()))
        locations = []
        for country_name in sorted(country_dic.keys()):
            d = {}
            d["country"] = country_name
            d["location"] = ""
            locations.append(d)
        # locations_json = json.dumps(locations)
        report = {}
        report["event_date"] = test.get_event_date()
        report["locations"] = locations
        report["diseases"] = sorted(disease_dic.keys())
        report["syndromes"] = sorted(syndrome_dic.keys())
        report["minor_locations"] = sorted(location_dic.keys())
        report["keyword_frequency"] = keyword_dic

        reports = []
        reports.append(report)
        json_object = json.loads(json.dumps(reports))

        return json_object





a = NLP_Processer()
with open('./content.json') as f:
    data = json.load(f)
f.close()
i = 0
for b in data :
    print("\n")
    json_object = a.make_reports(data[b])
    json_formatted_str = json.dumps(json_object, indent=2)
    print(json_formatted_str)
    print("\n\n")
    i+=1
    if i > 100 :
        break
        
