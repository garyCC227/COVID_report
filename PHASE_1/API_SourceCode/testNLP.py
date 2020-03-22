from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer 
import json

if __name__ == "__main__":
    val = input("Welcome to manual test platform\nEnter sentense ")
    val = "On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day"
    nlp_processer = NLP_Processer()
    nlp_processer.set_publication_date("2020-02-03 12:12:12")
    json_file = nlp_processer.make_reports(val)
    print(json_file)