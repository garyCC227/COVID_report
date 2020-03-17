import re
import json


from datetime import datetime
import time

dt = datetime.strptime('2015-10-20 22:24:46', '%Y-%m-%d %H:%M:%S')
ts = time.mktime(dt.timetuple())
print(int(ts))
# a = []

# with open("disease_pattern.json") as f:
#     datas = json.load(f)
# f.close()

# for  data in datas:
#     name = data["name"]
#     temp = re.search("DIS-(.+)",name)
#     name = temp.group(1)
#     general_names = data["general_names"]
#     for text in general_names :
#         if name.lower() != text.lower() :
#             a.append(text.lower())

# with open("syndrome_pattern.json") as f:
#     datas = json.load(f)
# f.close()

# for  data in datas:
#     name = data["name"]
#     temp = re.search("SYN-(.+)",name)
#     name = temp.group(1)
#     general_names = data["general_names"]
#     for text in general_names :
#         if name.lower() != text.lower() :
#             a.append(text.lower())

# with open("search_pattern.json") as f:
#     datas = json.load(f)
# f.close()

# for data in datas["keywords"] :
#     a.append(data)

# d = {}
# d["name"] = "search_keyword"
# d["keywords"] = a

# with open("search_pattern_new.json","w") as f:
#     f.write(json.dumps(d,indent = 2))
# f.close()

# print(d)