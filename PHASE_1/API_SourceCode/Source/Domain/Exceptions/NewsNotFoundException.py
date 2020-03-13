from .NotFoundException import NotFoundException


class NewsNotFoundException(NotFoundException):
    def __init__(self):
        super().__init__()
        self._message = "The news you requested is not found."
