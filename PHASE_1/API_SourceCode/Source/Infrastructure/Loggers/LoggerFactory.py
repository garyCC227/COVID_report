import logging


class LoggerFactory:
    def __new__(cls, name, formatter=None, file_handler=None, level=logging.NOTSET):
        logger = logging.getLogger(name)
        if len(logger.handlers) >= 1:
            return logger
        logger.setLevel(level)

        if formatter is not None and isinstance(formatter, logging.Formatter):
            pass
        else:
            formatter = logging.Formatter(
                '%(asctime)s | %(levelname)s | %(filename)s:%(lineno)s:%(funcName)s | %(message)s')

        if file_handler is not None and isinstance(file_handler, logging.FileHandler):
            pass
        else:
            file_handler = None

        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

        return logger
