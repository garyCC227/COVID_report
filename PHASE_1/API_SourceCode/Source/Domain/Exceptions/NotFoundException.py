import werkzeug

class NotFoundException(werkzeug.exceptions.HTTPException):
    code = 404
    description = "Not Found."

    def __init__(self):
        super().__init__()
        self.description = "Not Found."

    def to_dict(self):
        return self.description
