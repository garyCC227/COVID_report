from Date_Formater import Date_Formater 

if __name__ == "__main__":
    test = Date_Formater()
    while (1) :
        val = input("Enter Date or \"q\" to quit: ")
        if val == "q" :
            break
        else :
            print(test.match_date(val))
