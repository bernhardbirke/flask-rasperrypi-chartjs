# python data processing pipelines

from flask import (Flask, render_template, request, jsonify, json)


def boulderbar_prep(url_to_jsonl, label):
    with open(url_to_jsonl, 'r') as jsonl_file:
        text = jsonl_file.read()
        text2 = text.strip().replace("\n", ",").replace(
            "capacity", "y").replace("date", "x")
        jsonString = "["+text2+"]"
    datapoints1 = json.loads(jsonString)
    for i in range(len(datapoints1)):
        datapoints1[i]["x"] = datapoints1[i]["x"]*1000
    dataset1 = {"data": datapoints1, "label": label, "hidden": False}
    return dataset1
