import re

class Date_Formater:

  def __init__(self, year = "2020"):
    self.year = year
    self.dateStampFirst = None
    self.dateStampLast = None

  def get_event_date(self):
    if (self.dateStampLast == None and self.dateStampFirst == None) :
      return self.year + "-xx-xx xx:xx:xx"
    elif (self.dateStampLast == None) :
      return self.dateStampFirst
    else :
      return self.dateStampFirst + " to " + self.dateStampLast
  
  def check_add_zero(self,string):
    if len(string) == 1 :
      return "0" + string
    return string

  def match_date(self,date_string):
    year = None
    mon = None
    day = None
    temp = re.search("(20|19|18)[0-9][0-9]",date_string)
    if temp == None :
      year = self.year
    else :
      year = temp.group()
    
    temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{4})",date_string)
    if temp != None :
      year = temp.group(5)
      mon = temp.group(3)
      day = temp.group(1)
      
      if int(mon) > 12 :
        a = mon
        mon = day
        day = a

      mon = self.check_add_zero(mon)
      day = self.check_add_zero(day)
      return  year + "-" + mon + "-" + day + " xx:xx:xx"
    
    temp = re.search("([0-9]{4})(\.|/| |-|_)+([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{2}|[0-9])",date_string)
    
    if temp != None :
      year = temp.group(1)
      mon = temp.group(3)
      day = temp.group(5)
      
      if int(mon) > 12 :
        a = mon
        mon = day
        day = a

      mon = self.check_add_zero(mon)
      day = self.check_add_zero(day)
      return  year + "-" + mon + "-" + day + " xx:xx:xx"

    #Try to match the format and extract data
    temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{2}|[0-9])",date_string)
    if temp != None :
      year = temp.group(5)
      mon = temp.group(3)
      day = temp.group(1)

      if int(mon) > 12 :
        a = mon
        mon = day
        day = a

      if int(day) > 31 :
        a = day
        day = year
        year = a

      mon = self.check_add_zero(mon)
      day = self.check_add_zero(day)

      return "20" + year + "-" + mon + "-" + day + " xx:xx:xx"

    temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_)+([0-9]{2}|[0-9])",date_string)

    if temp != None :
      mon = temp.group(1)
      day = temp.group(3)
      if int(mon) > 12 :
        a = mon
        mon = day
        day = a
      
      mon = self.check_add_zero(mon)
      day = self.check_add_zero(day)
      return  year + "-" + mon + "-" + day + " xx:xx:xx"

    # Try to extract month from string
    temp = re.search("(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)", date_string, re.IGNORECASE)

    if temp != None :
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
    
    # Try to extract day and assume day is in the middle of the phrase
    temp = re.search("\D(([0-9]{2}|[0-9]{1}))\D",date_string)
    if temp != None :
      day = self.check_add_zero(temp.group(1))
    
    # Try to extract day and assume day is at the first of the phrase
    if day == None :
      temp = re.search("^(([0-9]{2}|[0-9]{1}))\D",date_string)
      if temp != None :
        day = self.check_add_zero(temp.group(1))

    # Try to extract day and assume day is at the end of the phrase
    if day == None :
      temp = re.search("\D(([0-9]{2}|[0-9]{1}))$",date_string)
      if temp != None :
        day = self.check_add_zero(temp.group(1))
    
    if mon == None :
      return year + "-xx-xx xx:xx:xx"
    
    if day == None :
      return  year + "-" + mon + "-xx xx:xx:xx"

    return  year + "-" + mon + "-" + day + " xx:xx:xx"
  
    
    