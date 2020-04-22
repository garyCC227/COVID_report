import json


class GetTopDiseases:

    def __new__(cls):
        with open('./DB/top6disease.json') as fileName:
            return json.load(fileName)
