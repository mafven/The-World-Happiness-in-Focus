import psycopg2 
from psycopg2.extras import RealDictCursor
from flask import Flask, render_template 
import pandas as pd 
import json


# Connection to DB tables
try: 
    connection = psycopg2.connect(user = "otpukwazoejqjq", 
                                  password= "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM happinessoveryears" 
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

try: 
    connection = psycopg2.connect(user = "otpukwazoejqjq", 
                                  password= "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM bottom" 
    cursor.execute(selection)
    bottom = cursor.fetchall()
    bottom_df = pd.DataFrame(bottom)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")

try: 
    connection = psycopg2.connect(user = "otpukwazoejqjq", 
                                  password= "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM top" 
    cursor.execute(selection)
    top = cursor.fetchall()
    top_df = pd.DataFrame(top)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")

try: 
    connection = psycopg2.connect(user = "otpukwazoejqjq", 
                                  password= "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM happiness2021" 
    cursor.execute(selection)
    happiness2021 = cursor.fetchall()
    happiness2021_df = pd.DataFrame(happiness2021)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")

try: 
    connection = psycopg2.connect(user = "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM top_2021" 
    cursor.execute(selection)
    top2021 = cursor.fetchall()
    top2021_df = pd.DataFrame(top2021)
except (Exception, psycopg2.Error) as error : 
    print ("Error", error)
finally: 
    if connection:
        cursor.close()
        connection.close()
        print("Connection closed")


try: 
    connection = psycopg2.connect(user = "otpukwazoejqjq", 
                                  password= "pw", 
                                  host = "ec2-52-86-25-51.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "d2ip837ee83dvn") 
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    selection = "SELECT * FROM bottom2021" 
    cursor.execute(selection)
    bottom2021 = cursor.fetchall()
    bottom2021_df = pd.DataFrame(bottom2021)
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


@app.route("/api/main")
def main():
    result = main_df.to_json(orient="records")
    parsed = json.loads(result)
    main_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return main_df_json

@app.route("/api/bottom")
def bottom():
    result = bottom_df.to_json(orient="records")
    parsed = json.loads(result)
    bottom_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return bottom_df_json

@app.route("/api/top")
def top():
    result = top_df.to_json(orient="records")
    parsed = json.loads(result)
    top_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return top_df_json

@app.route("/api/happiness2021")
def happiness2021():
    result = happiness2021_df.to_json(orient="records")
    parsed = json.loads(result)
    happiness2021_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return happiness2021_df_json

@app.route("/api/top2021")
def top2021():
    result = top2021_df.to_json(orient="records")
    parsed = json.loads(result)
    top2021_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return top2021_df_json

@app.route("/api/bottom2021")
def bottom2021():
    result = bottom2021_df.to_json(orient="records")
    parsed = json.loads(result)
    bottom2021_df_json = json.dumps(parsed, skipkeys = True, allow_nan = True, indent = 6) 
    return bottom2021_df_json

if __name__ == "__main__":
    app.run(debug=True)

