class Location:

    def __init__(self, country, location):
        self._country = country
        self._location = location

    def get_country(self):
        return self._country

    def get_location(self):
        return self._location

    def to_dict(self):
        return {
            "country": self.get_country(),
            "location": self.get_location()
        }
