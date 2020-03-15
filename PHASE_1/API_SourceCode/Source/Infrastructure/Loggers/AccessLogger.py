from .LoggerFactory import LoggerFactory
import logging


class AccessLogger:
    _logger = None

    def __init__(self):
        logging_format = logging.Formatter('%(asctime)s | %(message)s')
        handler = logging.FileHandler('./logs/access.log', encoding='UTF-8')
        self._logger = LoggerFactory("access_logger", logging_format, handler, logging.INFO)

    def write(self, identity, uri):
        self._logger.info("{} {}".format(identity, uri))
