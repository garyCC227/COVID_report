from .server import *
from Source.Application.Actions.GetNewsByIdAction import GetNewsByIdAction
from Source.Application.Actions.GetNewsListAction import GetNewsListAction
import json

@app.after_request
def after_request_to_json(response):
    response.headers["Content-Type"] = "application/json"
    return response # TODO: jsonify

@app.route("/")
def hello():
    return {"message": "Hello World!"}

@app.route("/v1/news")
def get_news_list():
    return json.dumps(GetNewsListAction())

@app.route("/v1/news/<id>")
def get_news_by_id(id):
    return json.dumps(GetNewsByIdAction(id))
