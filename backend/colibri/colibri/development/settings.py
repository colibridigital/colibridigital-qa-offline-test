from ..settings import *

INSTALLED_APPS += [
    "django_extensions",
]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        },
    },
    "handlers": {
        "console": {
            "level": "ERROR",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "colibri.apps": {
            "handlers": ["console"],
            "propagate": True,
        },
    },
}

try:
    from .local_settings import *
except ImportError:
    pass
