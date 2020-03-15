from .NotFoundException import NotFoundException


class ReportNotFoundException(NotFoundException):
    def __init__(self):
        super().__init__()
        self.description = "The report you requested is not found."
