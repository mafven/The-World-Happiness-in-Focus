import psycopg2 
from psycopg2.extras import RealDictCursor
from flask import Flask, render_template 
import pandas as pd 
import json


#Connection to DB tables
try: 
    connection = psycopg2.connect(user = "postgres", 
                                  password= "9102", 
                                  host = "127.0.0.1",
                                  port = "5432", 
                                  database = "finalProjectDB") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM happinessoveryears" 
    cursor.execute(selection)
    mainData = cursor.fetchall()
    mainData_df = pd.DataFrame(mainData)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")

try: 
    connection = psycopg2.connect(user = "postgres", 
                                  password= "9102", 
                                  host = "127.0.0.1",
                                  port = "5432", 
                                  database = "finalProjectDB") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM happiness2021" 
    cursor.execute(selection)
    data2021 = cursor.fetchall()
    data2021_df = pd.DataFrame(data2021)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")

app = Flask(__name__,static_url_path='/static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/plot1")
def plot1(): 
    return render_template("plot_0_2.html")

@app.route("/plot2")
def plot2(): 
    return render_template("plot_3_5.html")

@app.route("/plot3")
def plot3(): 
    return render_template("plot_6_7.html")

@app.route("/plot4")
def plot4(): 
    return render_template("plot_8_10.html")

@app.route("/plot_template")
def template(): 
    return render_template("plot_template.html")


@app.route("/api/mainData")
def mainData():
    result = mainData_df.to_json(orient="records")
    parsed = json.loads(result)
    mainData_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return mainData_df_json

@app.route("/api/data2021")
def data2021():
    result = data2021_df.to_json(orient="records")
    parsed = json.loads(result)
    data2021_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return data2021_json

if __name__ == "__main__":
    app.run(debug=True)
