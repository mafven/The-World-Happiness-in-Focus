import psycopg2 
from psycopg2.extras import RealDictCursor
from flask import Flask, render_template 
import pandas as pd 
import json


# Connection to DB tables
try: 
    connection = psycopg2.connect(user = "postgres", 
                                  password= "9102", 
                                  host = "127.0.0.1",
                                  port = "5432", 
                                  database = "finalProjectDB") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM three" 
    cursor.execute(selection)
    three = cursor.fetchall()
    three_df = pd.DataFrame(three)
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
    selection = "SELECT * FROM seven" 
    cursor.execute(selection)
    seven = cursor.fetchall()
    seven_df = pd.DataFrame(seven)
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
    selection = "SELECT * FROM ten" 
    cursor.execute(selection)
    ten = cursor.fetchall()
    ten_df = pd.DataFrame(ten)
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
    selection = "SELECT * FROM main" 
    cursor.execute(selection)
    main = cursor.fetchall()
    main_df = pd.DataFrame(main)
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
    return render_template("plot1.html")

@app.route("/plot2")
def plot2(): 
    return render_template("plot2.html")

@app.route("/plot3")
def plot3(): 
    return render_template("plot3.html")

@app.route("/plot_template")
def template(): 
    return render_template("plot_template.html")


@app.route("/api/three")
def three():
    result = three_df.to_json(orient="records")
    parsed = json.loads(result)
    three_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return three_df_json

@app.route("/api/seven")
def seven():
    result = seven_df.to_json(orient="records")
    parsed = json.loads(result)
    seven_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return seven_json

@app.route("/api/ten")
def ten():
    result = ten_df.to_json(orient="records")
    parsed = json.loads(result)
    ten_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return ten_df_json

@app.route("/api/main")
def main():
    result = main_df.to_json(orient="records")
    parsed = json.loads(result)
    main_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return main_df_json

if __name__ == "__main__":
    app.run(debug=True)
