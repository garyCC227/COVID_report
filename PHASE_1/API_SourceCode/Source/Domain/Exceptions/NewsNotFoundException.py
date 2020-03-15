from .NotFoundException import NotFoundException


class NewsNotFoundException(NotFoundException):
    def __init__(self):
        super().__init__()
        self.description = "The news you requested is not found."
