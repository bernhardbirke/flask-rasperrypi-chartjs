import os
from configparser import ConfigParser
from flaskhome.definitions import ROOT_DIR

url_to_database = os.path.join(ROOT_DIR, "database.ini")


def config(filename=url_to_database, section="postgresql"):
    """define the details of a database connection based on database.ini"""
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(
            "Section {0} not found in the {1} file".format(section, filename)
        )

    return db
