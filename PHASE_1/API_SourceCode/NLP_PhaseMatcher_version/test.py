import sys
sys.path.insert(1,"C:\\Users\\ASUS\\se3011\\SENG3011_APInteresting\\PHASE_1\\API_SourceCode\\scrapy_script\\NLP_PhaseMatcher_version\\NLP_Processer.py")
from NLP_Processer import NLP_Processer
from langdetect import detect
import json

def main():
    nlp_processer = NLP_Processer()
    l = []
    with open('../content.json', 'r') as f:
        store = json.load(f)
    f.close()

    posts = store['posts']
    new = {
        'data' :[]
    }

    i = 0
    posts = store['posts']
    for key, post in posts.items():
        if i < 2 :
            i+=1
            continue
        maintext = post['content']
        title = post['title']
        url = post['url']
        date = post['date'].replace("T", " ")

        if len(maintext) < 300 or maintext[3:10] in "NCBIErrorYour access to the NCBI website":
            continue

        if detect(maintext) != "en":
            continue  

        reports = nlp_processer.make_reports(maintext)
        d = {}
        d["url"] = url
        d["date_of_publication"] = date
        d["headline"] = title
        d["main_text"] = maintext
        d["reports"] = reports
        d["keyword_frequency"] = nlp_processer.get_keyword_frequency()
        d["keyword_location"] = nlp_processer.get_keyword_location()
        d["keyword_list"] = nlp_processer.get_keyword_list()
        new['data'].append(d)
        i+=1
        if i > 60 :
            break


    with open('articles.json', 'w') as f:
        json.dump(new, f, indent=4)
    f.close()


if __name__ == "__main__":
    main()