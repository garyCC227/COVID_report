class Location:

    def __init__(self, google_id, address):
        self._google_id = google_id
        self._address = address

    def get_google_id(self):
        return self._google_id

    def get_address(self):
        return self._address

    def to_dict(self):
        return {
            "google_id": self.get_google_id(),
            "address": self.get_address()
        }
