import psycopg2
from flaskhome.postgresql_config import config


def read_current_watt():
    """ query momentanleistung_p from the smartmeter table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(
            "SELECT data_id, time, wirkenergie_p, momentanleistung_p FROM smartmeter ORDER BY data_id DESC LIMIT 5")
        watt_row = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        return watt_row
