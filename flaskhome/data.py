# flask routes to data blueprint data
import os
from pathlib import Path
import shutil
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from flaskhome.data_prep import boulderbar_prep
from flaskhome.definitions import ROOT_DIR
# load environment variables such as the directories to raw data files
from dotenv import load_dotenv

# modules for the connection to the postgreSQL Database.
from flaskhome.postgresql_tasks import read_current_watt


load_dotenv()


bp = Blueprint('data', __name__, url_prefix='/data')


@bp.route('/boulderbar', methods=["GET", "POST"])
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
        # merge the Datasets into one File
        file = {"datasets": [dataset1, dataset2]}
        # return file to frontend
        return file

    return render_template('data/selectdate.html', title="Boulderbar Capacity", description="Capacity of Boulderbar")


@bp.route('/climate', methods=["GET", "POST"])
def climate():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        print(jsonData)
        # defining source and destination
    # paths
    try:
        klimalogg_skin_path = os.getenv("KLIMALOGG_WEEWX_HTML")
        target_path_images = os.path.join(
            ROOT_DIR, 'flaskhome/static/klimalogg')
        target_path_template = os.path.join(
            ROOT_DIR, 'flaskhome/templates/data')

        files = os.listdir(klimalogg_skin_path)

        # iterating over all the files in
        # the source directory
        for fname in files:
            # copying the files to the
            # destination directory
            shutil.copy2(os.path.join(klimalogg_skin_path, fname),
                         target_path_images)

        # copy html file in corresponding template folder
        shutil.copy2(os.path.join(klimalogg_skin_path,
                                  "index.html"), target_path_template)
    finally:
        return render_template('data/index.html', title="Indoor Climate", description="Indoor Climate")


@bp.route('/electricity', methods=["GET", "POST"])
def electricity():
    if request.method == "POST":
        # print POST message
        jsonData = request.get_json()
        print(jsonData)
        # connect to the smartmeter database and retrive the current power (momentanleistung_p) in watt
        watt_row = read_current_watt()
        array = list(watt_row)
        print(array)
        # return file to frontend
        return array

    return render_template('data/electricity.html', title="Electricity", description="Data concerning electricity")
