from NLP_PhaseMatcher_version.NLP_Processer import NLP_Processer
from db.db import setDocument
from langdetect import detect
import json
import time
import re
from datetime import datetime

def check_add_zero(string):
    if len(string) == 1 :
        return "0" + string
    return string

def match_date(date) :
    temp = re.search("([a-zA-Z]+) ([0-9]+), ([0-9]+)", date)
    day = temp.group(2)
    mon = temp.group(1)
    year = temp.group(3)
    temp = re.search("(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)", mon, re.IGNORECASE)
    extract = temp.group(1).lower()
    if extract == "jan" :
        mon = "01"
    elif extract == "feb" :
        mon = "02"
    elif extract == "mar" :
        mon = "03"
    elif extract == "apr" :
        mon = "04"
    elif extract == "may" :
        mon = "05"
    elif extract == "jun" :
        mon = "06"
    elif extract == "jul" :
        mon = "07"
    elif extract == "aug" :
        mon = "08"
    elif extract == "sep" :
        mon = "09"
    elif extract == "oct" :
        mon = "10"
    elif extract == "nov" :
        mon = "11"
    else :
        mon = "12"
    day = check_add_zero(day)
    return year + "-" + mon + "-" + day + " xx:xx:xx" 

def main():
    nlp_processer = NLP_Processer()
    with open('new_data.json', 'r') as f:
        store = json.load(f)
    f.close()

    posts = store['posts']
    new = {
        'data' :[]
    }

    i = 0
    posts = store['posts']
    for post in posts:
        if i < 0 :
            i+=1
            continue
        print(i)
        maintext = post['content']
        title = post['title']
        url = post['url']
        date = post['date']
        if len(maintext) < 300 or maintext[3:10] in "NCBIErrorYour access to the NCBI website":
            continue

        if detect(maintext) != "en":
            continue  
        date = match_date(date)
        nlp_processer.set_publication_date(date)
        dt = datetime.strptime(date, "%Y-%m-%d xx:xx:xx")
        ts = time.mktime(dt.timetuple())
        reports = nlp_processer.make_reports(maintext)
        d = {}
        d["url"] = url
        d["date_of_publication"] = int(ts)
        d["headline"] = title
        d["main_text"] = maintext
        d["reports"] = reports
        d["keyword_frequency"] = nlp_processer.get_keyword_frequency()
        d["keyword_location"] = nlp_processer.get_keyword_location()
        d["keyword_list"] = nlp_processer.get_keyword_list()
        new['data'].append(d)
        json_file = json.dumps(d, indent = 2)
        json_file = json.loads(json_file)
        setDocument(json_file)
        i+=1
        if i >  110:
            break

    # with open('articles.json', 'w') as f:
    #     json.dump(new, f, indent=4)
    # f.close()


if __name__ == "__main__":
    main()