import spacy
import re
import json
from spacy.matcher import PhraseMatcher
from Date_Formater import Date_Formater
from Location_Checker import Location_Checker

class NLP_Processer :

    def __init__ (self, date_of_publication = "", headline = "", main_text = "", url = "", 
                    disease_pattern_loc = "./disease_pattern.json" , 
                    search_pattern_loc = "./search_pattern.json", 
                    syndrome_pattern_loc = "./syndrome_pattern.json"):
        self.date_of_publication = date_of_publication
        self.headline = headline
        self.main_text = main_text
        self.url = url
        self.disease_pattern_loc = disease_pattern_loc
        self.search_pattern_loc = search_pattern_loc
        self.syndrome_pattern_loc = syndrome_pattern_loc
        self.nlp = spacy.load('en_core_web_sm')
        self.matcher = PhraseMatcher(self.nlp.vocab, attr='LOWER', max_length=5)

    def load_pattern(self,location) :
        with open(location) as f:
            datas = json.load(f)
        f.close()

        for  data in datas:
            name = data["name"]
            general_names = data["general_names"]
            patterns = [self.nlp.make_doc(text) for text in general_names]
            self.matcher.add(name, None, *patterns)
    
    def match(self, text) :
        doc = self.nlp(text)
        matches = self.matcher(doc)
        for match_id, start, end in matches:
            span = doc[start:end]
            print(self.nlp.vocab.strings[match_id]+ "  " + span.text)




a = NLP_Processer()
a.load_pattern("./disease_pattern.json")
a.load_pattern("./syndrome_pattern.json")
with open('./content.json') as f:
    data = json.load(f)
f.close()
i = 0
for b in data :
    print("\n")

    print(str(i) + "\n" + data[b])
    a.match(data[b])
    print("\n\n")
    i+=1
    if i > 100 :
        break
        
