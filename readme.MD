## To test run flask directly

flask --app flaskhome --debug run

## Deploy to production:

Create a project folder and a venv folder within:

```
python3 -m venv ./venv
source ./venv/bin/activate
```

Copy this file to another machine, set up a new virtualenv, then install the file with pip.

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

waitress-serve --call 'flaskhome:create_app'

## Climate (Weewx and Klimalogg Pro)

Install Weewx on the Rasperry Pi using the instructions on https://github.com/matthewwall/weewx-klimalogg

A SQ Lite database file can be found at /var/lib/weewx/. Other files are stored according to https://weewx.com/docs/usersguide.htm

## Electricity

To connect to the postgreSQL database install the module psycopg2
pip install psycopg2

### Grafana Query

```
SELECT date_trunc('day', time) d, sum(wirkenergie_p_diff) AS "Power Usage", sum(wirkenergie_n_diff) AS "Einspeisung" FROM smartmeter_diff GROUP BY d ORDER BY d LIMIT 50;

```

```
SELECT date_trunc('hour', time) h, sum(wirkenergie_p_diff) AS "Power Usage", sum(wirkenergie_n_diff) AS "Einspeisung" FROM smartmeter_diff GROUP BY h ORDER BY h LIMIT 40;

```
