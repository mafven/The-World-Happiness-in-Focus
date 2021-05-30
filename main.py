import psycopg2 
from psycopg2.extras import RealDictCursor
from flask import Flask, render_template 
import pandas as pd 
import json


# Connection to DB tables
try: 
    connection = psycopg2.connect(user = "zzvkedujbigpex", 
                                  password= "51485eb7c89d4d9009560d46f5ea8afcc85e2646ffe59f5da4a4fcad973c93e5", 
                                  host = "ec2-54-224-194-214.compute-1.amazonaws.com",
                                  port = "5432", 
                                  database = "dcsho1ugg2d49i")
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

if __name__ == "__main__":
    app.run(debug=True)
