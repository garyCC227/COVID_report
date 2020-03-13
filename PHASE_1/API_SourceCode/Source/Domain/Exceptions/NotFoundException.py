class NotFoundException(Exception):
    def __init__(self):
        super().__init__()
        self._message = "Not Found."

    def to_dict(self):
        return self._message
