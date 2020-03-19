import werkzeug


class MalformedRequestException(werkzeug.exceptions.HTTPException):
    code = 400
    description = "Malformed Request"

    def __init__(self):
        super().__init__()
        self.description = "Malformed Request"

    def to_dict(self):
        return self.description
