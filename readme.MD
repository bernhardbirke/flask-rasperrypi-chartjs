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
