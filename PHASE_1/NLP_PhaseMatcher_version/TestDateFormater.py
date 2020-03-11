from Date_Formater import Date_Formater 

def return_date_string() :
    test = Date_Formater()
    while (1) :
        val = input("Enter Date or \"q\" to quit: ")
        if val == "q" :
            print("Thank you for testing")
            break
        else :
            print(test.match_date(val))  
    val = input("Test again? (y/n)")
    if val == "y" :
        return_date_string()

def return_date_period() :
    print("Type in string of date one by one, and \"q\" to stop\nThe result should be a period of date or a single date\nThe period should be as long as posible\nAnd the date should be as accurate as possible ")
    test = Date_Formater()
    while (1) :
        val = input("Enter Date or \"q\" to stop: ")
        print(test.match_date(val))
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
        elif val == "q" :
            print("Thank you for testing")
            break
        else :
            val = input("Welcome to manual test platform\nEnter \"1\" for single date formater\nEnter \"2\" for a set of date\nEnter \"q\" to quit ")
