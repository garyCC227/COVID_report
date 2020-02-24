from .server import *

@app.route("/")
def hello():
    return "Hello World!"
