from NLP_Processer import NLP_Processer 
import json

if __name__ == "__main__":
    val = input("Welcome to manual test platform\nEnter sentense ")
    val = "Three people infected by what is thought to be H5N1 or H7N9 in Ho Chi Minh city. First infection occurred on 1 Dec 2018, and latest is report on 10 December. Two in hospital, one has recovered. Furthermore, two people with fever and rash infected by an unknown disease."
    nlp_processer = NLP_Processer()
    json_file = nlp_processer.make_reports(val)[0]
    print(json_file)