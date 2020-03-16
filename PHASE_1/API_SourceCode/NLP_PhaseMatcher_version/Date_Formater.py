import re

class Date_Formater:

  def __init__(self, year = "2020"):
    self.year = year
    self.time_string_buffer = ""
    self.dateStampFirst = None
    self.dateStampLast = None

  def get_event_date(self):
    if (self.dateStampLast == None and self.dateStampFirst == None) :
      return self.year + "-xx-xx xx:xx:xx"
    elif (self.dateStampLast == None) :
      return self.dateStampFirst
    else :
      return self.dateStampFirst + " to " + self.dateStampLast

  def error_date_ignore(self,date_string):
    temp = re.search("^([0-9]{4})-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",date_string)
    if temp == None :
      return self.year + "-xx-xx xx:xx:xx"
    else :
      year = temp.group(1)
      mon = temp.group(2)
      day = temp.group(3)

      if (int(year) > int(self.year) + 2) or (int(year) < int(self.year) - 3) :
        return self.year + "-xx-xx xx:xx:xx"

      if mon != "xx" and (int(mon) > 12 or int(mon) == 0) :
        return self.year + "-xx-xx xx:xx:xx"
      
      if day != "xx" and (int(day) > 31 or int(day) == 0) :
        return self.year + "-xx-xx xx:xx:xx"
    return date_string

  
  def check_add_zero(self,string):
    if len(string) == 1 :
      return "0" + string
    return string

  def match_time(self,time_string):
    add_on = 0
    temp = re.search("p(\.| )*m",time_string, re.IGNORECASE)
    if temp != None :
      add_on = 12
    temp = re.search("([0-2][0-9]|[0-9]):([0-6][0-9]|[0-9])",time_string)
    if temp != None :
      hour = temp.group(1)
      minute = temp.group(2)
      hour = str((int(hour) + add_on)%24)
      return self.check_add_zero(hour) + ":" + self.check_add_zero(minute) + ":" + "xx"
    temp = re.search("([0-2][0-9]|[0-9])-([0-6][0-9]|[0-9])",time_string)
    if temp != None :
      hour = temp.group(2)
      hour = str((int(hour) + add_on)%24)
      return self.check_add_zero(hour) + ":xx:xx"
    temp = re.search("([0-2][0-9]|[0-9])",time_string)
    if temp != None :
      hour = temp.group()
      hour = str((int(hour) + add_on)%24)
      return self.check_add_zero(hour) + ":xx:xx"
    return None

  def add_time(self,time_string) :
    time_string = self.match_time(time_string)
    if time_string != None :
      if self.dateStampFirst == None :
        self.time_string_buffer = time_string
      else :
        temp = re.search("^(.+) (.+)$",self.dateStampFirst)
        if temp.group(2) == "xx:xx:xx" and temp.group(1) != "2020-xx-xx":
          self.dateStampFirst = temp.group(1) + " " + time_string
        else :
          if self.dateStampLast == None :
            self.time_string_buffer = time_string
          else :
            temp = re.search("^(.+) (.+)$",self.dateStampLast)
            if temp.group(1) != "2020-xx-xx" :
              self.dateStampLast = temp.group(1) + " " + time_string

  def match_date(self,date_string) :
    year = None
    mon = None
    day = None

    temp = re.search("^[0-9]{4}$",date_string)
    if temp != None :
      return [self.year + "-xx-xx xx:xx:xx"]

    temp = re.search("[0-9]{4}-([0-9]{4}|[0-9]{2})[^-]",date_string)
    if temp != None :
      return [self.year + "-xx-xx xx:xx:xx"]

    temp = re.search("[0-9]{4}-([0-9]{4}|[0-9]{2})$",date_string)
    if temp != None :
      return [self.year + "-xx-xx xx:xx:xx"]

    temp = re.search("20[0-9][0-9]",date_string)
    if temp == None :
      year = self.year
    else :
      year = temp.group()
    
    temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{4})",date_string)
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
      return  [self.error_date_ignore(year + "-" + mon + "-" + day + " xx:xx:xx")]
    
    temp = re.search("([0-9]{4})(\.|/| |-|_|,)+([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{2}|[0-9])",date_string)
    
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
      return  [self.error_date_ignore(year + "-" + mon + "-" + day + " xx:xx:xx")]

    #Try to match the format and extract data
    temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{2}|[0-9])",date_string)
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

      return [self.error_date_ignore("20" + year + "-" + mon + "-" + day + " xx:xx:xx")]

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
      temp = re.search("(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(\.| |/|,)+([0-9]{2}|[0-9])(-| to |to| to|to )([0-9]{2}|[0-9])", date_string, re.IGNORECASE)
      if temp != None :
        day1 = temp.group(3)
        day2 = temp.group(5)
        return  [self.error_date_ignore(year + "-" + mon + "-" + self.check_add_zero(day1) + " xx:xx:xx"), self.error_date_ignore(year + "-" + mon + "-" + self.check_add_zero(day2) + " xx:xx:xx")]
    # else :
    #   temp = re.search("([0-9]{2}|[0-9])(\.|/| |-|_|,)+([0-9]{2}|[0-9])",date_string)
    #   if temp != None :
    #     mon = temp.group(1)
    #     day = temp.group(3)
    #     if int(mon) > 12 :
    #       a = mon
    #       mon = day
    #       day = a 
    #     mon = self.check_add_zero(mon)
    #     day = self.check_add_zero(day)
    #     return  self.error_date_ignore(year + "-" + mon + "-" + day + " xx:xx:xx")
    
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
      return [year + "-xx-xx xx:xx:xx"]
    
    if day == None :
      return  [year + "-" + mon + "-xx xx:xx:xx"]

    return  [self.error_date_ignore(year + "-" + mon + "-" + day + " xx:xx:xx")]

  def get_max_timeStamp(self,year,mon,day) :
    if mon == "xx" :
      mon = "99"
    if day == "xx" :
      day = "99"
    return int(year + mon + day)

  def get_min_timeStamp(self,year,mon,day) :
    if mon == "xx" :
      mon = "00"
    if day == "xx" :
      day = "00"
    return int(year + mon + day)

  # add a date from date-like string and check if it's a new date or have been
  # include in present period of time
  # this is the main function you should be calling 
  def add_date(self,string):
    date_string_list = self.match_date(string)
    if self.time_string_buffer != "" and date_string_list[0] != (self.year + "-xx-xx xx:xx:xx"):
      temp = re.search("^(.+) (.+)$", date_string_list[0])
      date_string_list[0] = temp.group(1) + " " + self.time_string_buffer
      self.time_string_buffer = ""
    for date_string in date_string_list:
      if self.dateStampFirst == None :
        self.dateStampFirst = date_string
      else :
        if self.dateStampLast == None :
          temp = re.search("^([0-9]+)-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",self.dateStampFirst)
          old_date = temp.group(0)
          old_year = temp.group(1)
          old_mon = temp.group(2)
          old_day = temp.group(3)
          

          temp = re.search("^([0-9]+)-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",date_string)
          new_date = temp.group(0)
          new_year = temp.group(1)
          new_mon = temp.group(2)
          new_day = temp.group(3)

          if old_year == new_year :
            if old_mon == "xx" :
              self.dateStampFirst = new_date
            elif new_mon == "xx" : 
              self.dateStampFirst = old_date
            else :
              if int(old_mon) > int(new_mon) :
                self.dateStampLast = self.dateStampFirst
                self.dateStampFirst = new_date
              elif int(new_mon) > int(old_mon) :
                self.dateStampLast = new_date
              else :
                if old_day == "xx" :
                  self.dateStampFirst = new_date
                elif new_day == "xx" : 
                  self.dateStampFirst = old_date
                else :
                  if int(old_day) > int(new_day) :
                    self.dateStampLast = self.dateStampFirst
                    self.dateStampFirst = new_date
                  elif int(new_day) > int(old_day) :
                    self.dateStampLast = new_date
          elif int(old_year) > int(new_year) :
            # if old_mon == "xx" :
            #   self.dateStampFirst = new_date
            # elif new_mon == "xx" : 
            #   self.dateStampFirst = old_date
            # else :
            self.dateStampLast = self.dateStampFirst
            self.dateStampFirst = new_date
          else :
            # if old_mon == "xx" :
            #   self.dateStampFirst = new_date
            # elif new_mon == "xx" : 
            #   self.dateStampFirst = old_date
            # else :
            self.dateStampLast = new_date
        else :
          temp = re.search("^([0-9]+)-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",self.dateStampFirst)
          first_date_year = temp.group(1)
          first_date_mon = temp.group(2)
          first_date_day = temp.group(3)
          
          temp = re.search("^([0-9]+)-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",self.dateStampLast)
          last_date_year = temp.group(1)
          last_date_mon = temp.group(2)
          last_date_day = temp.group(3)

          temp = re.search("^([0-9]+)-([0-9]{2}|x{2})-([0-9]{2}|x{2}) ([0-9]{2}|x{2}):([0-9]{2}|x{2}):([0-9]{2}|x{2})$",date_string)
          new_date = temp.group(0)
          new_year = temp.group(1)
          new_mon = temp.group(2)
          new_day = temp.group(3)

          first_timeStamp = self.get_max_timeStamp(first_date_year,first_date_mon,first_date_day)
          last_timeStamp = self.get_min_timeStamp(last_date_year,last_date_mon,last_date_day)
          
          if first_timeStamp > self.get_max_timeStamp(new_year,new_mon,new_day) :
            self.dateStampFirst = new_date
            return
          
          if last_timeStamp < self.get_min_timeStamp(new_year,new_mon,new_day) :
            self.dateStampLast = new_date
          return
  
    
    