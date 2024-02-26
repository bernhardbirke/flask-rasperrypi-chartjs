### Installation

Git clone the repository

```
python3 -m venv ./venv
source ./venv/bin/activate
pip install Flask
pip install python-dotenv
```

To start using flask this tutorial is recommended:
https://flask.palletsprojects.com/en/2.3.x/tutorial/

### add missing environment files

add a file in `/flaskhome/definitions.py` containing:

```
# define Root Direction in a variable
ROOT_DIR = /home/my/user/flask-server/
```

add a file in `/.env` containing:

```
#paths to data files
#Boulderbar
BOULDERBAR_HBF_PATH = /home/my/user/scrapy/boulderbar/boulderbarhbf.jsonl
BOULDERBAR_HAN_PATH = /home/my/user/shared/scrapy/boulderbar/boulderbarhan.jsonl

#Klimalogg Pro
KLIMALOGG_WEEWX_HTML = /var/www/html/weewx/kl


```

## To test run flask directly

flask --app flaskhome --debug run

## Deploy to production:

Create a project folder and a venv folder within:

```
python3 -m venv ./venv
source ./venv/bin/activate
```

If you have an Installation file, copy this file to another machine, set up a new virtualenv, then install the file with pip.

```
pip install flaskr-1.0.0-py3-none-any.whl
```

## Chart JS

Chart JS can be served via cdn or saved locally. I have it in /static/data. If you want to use the cdn version, please make sure to replace the <script src> in the /templates/data/selectdate.html to:

```
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.1.2/dist/chart.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@^1"></script>

```

## Make sure..

to set the right path to the raw data files.

## install the project

(necessary to use the WSGI -Server )

pip install -e .

## Deploy to production

Navigate to the project root folder:

source ./venv/bin/activate
pip install waitress
waitress-serve --call 'flaskhome:create_app'

## Climate (Weewx and Klimalogg Pro)

Install Weewx on the Rasperry Pi using the instructions on https://github.com/matthewwall/weewx-klimalogg

A SQ Lite database file can be found at /var/lib/weewx/. Other files are stored according to https://weewx.com/docs/usersguide.htm

## Electricity

To connect to the postgreSQL database install the module psycopg2

```
pip install psycopg2
```

OR

```
pip install psycopg2-binary
```

### Grafana Query

To visualize the data the Grafana dashboard is used.
The following queries show how to query the data from the postgresql database.

```
SELECT date_trunc('minute', time) m, sum(wirkenergie_p_diff) AS "Power Usage", sum(wirkenergie_n_diff) AS "Einspeisung" FROM smartmeter_diff GROUP BY m ORDER BY m DESC LIMIT 60;

```

```
SELECT
date_trunc('hour', COALESCE(s.time, f.time)) h,
(sum(s.wirkenergie_p_diff) - sum(s.wirkenergie_n_diff) + sum(f.total_energy_diff)) AS "Total Power Usage",
sum(f.total_energy_diff) AS "Total Solar Gain",
sum(s.wirkenergie_p_diff) AS "Metered Power Consumption",
sum(s.wirkenergie_n_diff) AS "Metered Solar Feed-In"
FROM smartmeter_diff s
FULL OUTER JOIN fronius_gen24_diff f
ON s.time = f.time
GROUP BY h
ORDER BY h DESC LIMIT 24;

```

### Heat Pump Query

```
SELECT date_bin('5 minutes', time, TIMESTAMP '2020-01-01') AS m,
SUM(brauchwasser_nur_verdichter_diff) AS "Wärmemenge Brauchwasser",
SUM(heizung_nur_verdichter_diff) AS "Wärmemenge Heizung",
(SUM(stromverbrauch) / 3600000) AS Stromverbrauch,
(SUM(brauchwasser_nur_verdichter_diff) + SUM(heizung_nur_verdichter_diff))/ NULLIF((SUM(stromverbrauch)/3600000),0) AS Arbeitszahl
FROM nibe_diff
GROUP BY m
ORDER BY m
DESC Limit 24;


```

```
SELECT date_trunc('day', time) m,
SUM(verdichterstarts_diff) AS Verdichterstarts,
SUM(gesamtbetriebszeit_verdichter_diff) AS Gesamtbetriebszeit,
SUM(gesamtbetriebszeit_verdichter_diff) / NULLIF(SUM(verdichterstarts_diff),0) AS "Verhältnis Zeit/Start"
FROM nibe_diff
GROUP BY m
ORDER BY m
DESC Limit 31;

```
