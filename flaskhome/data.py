# flask routes to data blueprint data
import os
from pathlib import Path
import shutil
from flask import Blueprint, flash, g, redirect, render_template, request, url_for
from flaskhome.data_prep import boulderbar_prep
from flaskhome.definitions import ROOT_DIR

# load environment variables such as the directories to raw data files
from dotenv import load_dotenv

# load grafana url data
from flaskhome.grafana_config import grafana_config

# modules for the connection to the postgreSQL Database.
from flaskhome.postgresql_tasks import read_current_watt, read_current_fronius


load_dotenv()


bp = Blueprint("data", __name__, url_prefix="/data")


@bp.route("/boulderbar", methods=["GET", "POST"])
def boulderbar():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        print(jsonData)
        # create dataset1 based on the raw datafile
        url_to_jsonl = os.getenv("BOULDERBAR_HBF_PATH")
        #   url_to_jsonl = os.path.join(
        #       ROOT_DIR, 'raw_data', 'boulderbarhbf.jsonl')
        label = "Boulderbar Hauptbahnhof"
        dataset1 = boulderbar_prep(url_to_jsonl, label)
        # create dataset2 based on the raw datafile
        url_to_jsonl = os.getenv("BOULDERBAR_HAN_PATH")
        #  url_to_jsonl = os.path.join(
        #     ROOT_DIR, 'raw_data', 'boulderbarhan.jsonl')
        label = "Boulderbar Hannovergasse"
        dataset2 = boulderbar_prep(url_to_jsonl, label)
        url_to_jsonl = os.getenv("BOULDERBAR_WB_PATH")
        #  url_to_jsonl = os.path.join(
        #     ROOT_DIR, 'raw_data', 'boulderbarwb.jsonl')
        label = "Boulderbar Wienerberg"
        dataset3 = boulderbar_prep(url_to_jsonl, label)
        # merge the Datasets into one File
        file = {"datasets": [dataset1, dataset2, dataset3]}
        # return file to frontend
        return file

    return render_template(
        "data/selectdate.html",
        title="Boulderbar Capacity",
        description="Capacity of Boulderbar",
    )


@bp.route("/climate", methods=["GET", "POST"])
def climate():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        print(jsonData)
        # defining source and destination
    # paths
    try:
        klimalogg_skin_path = os.getenv("KLIMALOGG_WEEWX_HTML")
        target_path_images = os.path.join(ROOT_DIR, "flaskhome/static/klimalogg")
        target_path_template = os.path.join(ROOT_DIR, "flaskhome/templates/data")

        files = os.listdir(klimalogg_skin_path)

        # iterating over all the files in
        # the source directory
        for fname in files:
            # copying the files to the
            # destination directory
            shutil.copy2(os.path.join(klimalogg_skin_path, fname), target_path_images)

        # copy html file in corresponding template folder
        shutil.copy2(
            os.path.join(klimalogg_skin_path, "index.html"), target_path_template
        )
    finally:
        return render_template(
            "data/index.html", title="Indoor Climate", description="Indoor Climate"
        )


@bp.route("/electricity", methods=["GET", "POST"])
def electricity():
    # You can add optional content here if desired
    return redirect(url_for("data.electricity_power_usage"))


@bp.route("/electricity/power_usage", methods=["GET", "POST"])
def electricity_power_usage():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        # connect to the smartmeter database and retrive total used electricity (wirkenergie_p) in Wh and the current power (momentanleistung_p) in watt
        # watt_row -> list[data_id, time, wirkenergie_p, momentanleistung_p]
        watt_row = read_current_watt()
        current_power_list = list(watt_row)
        # connect to the fronius_gen24 database and retrive PAC (harvesting current power) in W and TOTAL_ENERGY (total harvested energy) in Watthours
        # fronius_row -> list[data_id, time, PAC, TOTAL_ENERGY]
        fronius_row = read_current_fronius()
        current_fronius_list = list(fronius_row)
        # load the grafana url based on the database.ini file
        grafana_url = grafana_config(section="electricity_power_usage")
        electricity_dict = {
            "current_power": current_power_list,
            "current_fronius": current_fronius_list,
            "grafana_url": grafana_url,
        }
        # return file to frontend
        return electricity_dict

    return render_template(
        "data/electricity/power_usage.html",
        title="Power Usage",
        description="Data concerning electricity",
    )


@bp.route("/electricity/power_consumption", methods=["GET", "POST"])
def electricity_power_consumption():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        # load the grafana url based on the database.ini file
        grafana_url = grafana_config(section="electricity_power_consumption")
        electricity_dict = {
            "grafana_url": grafana_url,
        }
        # return file to frontend
        return electricity_dict

    return render_template(
        "data/electricity/power_consumption.html",
        title="Power Consumption",
        description="Data concerning power consumption",
    )


@bp.route("/heat_pump", methods=["GET", "POST"])
def heat_pump():
    # You can add optional content here if desired
    return redirect(url_for("data.heat_pump_temp"))


@bp.route("/heat_pump/temp", methods=["GET", "POST"])
def heat_pump_temp():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        # load the grafana url based on the database.ini file
        grafana_url = grafana_config(section="heat_pump_temp")
        electricity_dict = {
            "grafana_url": grafana_url,
        }
        # return file to frontend
        return electricity_dict

    return render_template(
        "data/heat_pump/temp.html",
        title="Heat Pump Temperatures",
        description="Data concerning Heat Pump Temperatures",
    )


@bp.route("/heat_pump/stats", methods=["GET", "POST"])
def heat_pump_stats():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        # load the grafana url based on the database.ini file
        grafana_url = grafana_config(section="heat_pump_stats")
        electricity_dict = {
            "grafana_url": grafana_url,
        }
        # return file to frontend
        return electricity_dict

    return render_template(
        "data/heat_pump/stats.html",
        title="Heat Pump Statistics",
        description="Data concerning Heat Pump Statistics",
    )


@bp.route("/heat_pump/process", methods=["GET", "POST"])
def heat_pump_process():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        # load the grafana url based on the database.ini file
        grafana_url = grafana_config(section="heat_pump_process")
        electricity_dict = {
            "grafana_url": grafana_url,
        }
        # return file to frontend
        return electricity_dict

    return render_template(
        "data/heat_pump/process.html",
        title="Heat Pump Processes",
        description="Data concerning Heat Pump Processes",
    )
