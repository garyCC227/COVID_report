from Date_Formater import Date_Formater
import spacy
import json

def auto_test() :
    nlp = spacy.load("en_core_web_sm")
    with open('./content.json') as f:
        data = json.load(f)
    i = 0
    for a in data :
        print("\n\n\n")
        print(data[a])
        doc = nlp(data[a])
        test = Date_Formater()
        for ent in doc.ents:
            if ent.label_ == "TIME" :
                test.add_time(ent.text)
            elif ent.label_ == "DATE" or ent.label_ == "ORG" :
                test.add_date(ent.text)
        print(test.get_event_date())
        print("---------")
        print("\n\n\n")
        i+=1
        if i > 30 :
            break
    f.close()

def test_time() :
    test = Date_Formater()
    while (1) :
        val = input("Enter Time or \"q\" to quit: ")
        if val == "q" :
            print("Thank you for testing")
            break
        else :
            a = test.match_time(val)
            print(a)  
    val = input("Test again? (y/n)")
    if val == "y" :
        return_date_string()  

def auto_test_time() :
    nlp = spacy.load("en_core_web_sm")
    with open('./content.json') as f:
        data = json.load(f)
    i = 0
    for a in data :
        if i > 300 :
            doc = nlp(data[a])
            for ent in doc.ents:
                if ent.label_ == "GPE":
                    print(ent.text)
        i+=1
        if i > 600 :
            break
    f.close()


def return_date_string() :
    test = Date_Formater()
    while (1) :
        val = input("Enter Date or \"q\" to quit: ")
        if val == "q" :
            print("Thank you for testing")
            break
        else :
            a = test.match_date(val)
            for c in a :
                print(c)  
    val = input("Test again? (y/n)")
    if val == "y" :
        return_date_string()

def return_date_period() :
    print("Type in string of date one by one, and \"q\" to stop\nThe result should be a period of date or a single date\nThe period should be as long as posible\nAnd the date should be as accurate as possible ")
    test = Date_Formater()
    while (1) :
        val = input("Enter Date or \"q\" to stop: ")
        a = test.match_date(val)
        for c in a :
            print(c)  
        if val == "q" :
            print("Thank you for testing")
            break
        else :
            test.add_date(val)
    print(test.get_event_date())
    val = input("Test again? (y/n)")
    if val == "y" :
        return_date_period()

if __name__ == "__main__":
    test = Date_Formater()
    val = input("Welcome to manual test platform\nEnter \"1\" for single date formater\nEnter \"2\" for a set of date\nEnter \"q\" to quit ")
    while (1) :
        if val == "1" :
            return_date_string()
            break
        elif val == "2" :
            return_date_period()
            break
        elif val == "3" :
            auto_test()
            break
        elif val == "6" :
            auto_test_time()
            break
        elif val == "5" :
            test_time()
            break
        elif val == "q" :
            print("Thank you for testing")
            break
        else :
            val = input("Welcome to manual test platform\nEnter \"1\" for single date formater\nEnter \"2\" for a set of date\nEnter \"q\" to quit ")
