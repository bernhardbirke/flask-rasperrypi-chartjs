import os
from configparser import ConfigParser
from flaskhome.definitions import ROOT_DIR

url_to_database = os.path.join(ROOT_DIR, "database.ini")


def grafana_config(filename=url_to_database, section="grafana_url") -> dict:
    """define the details of the grafana data graphs based on database.ini. returns a dictionary"""
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    grafana_url = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            grafana_url[param[0]] = param[1]
    else:
        raise Exception(
            "Section {0} not found in the {1} file".format(section, filename)
        )

    return grafana_url
