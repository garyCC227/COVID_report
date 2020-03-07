from .server import *
from .response import make_response
from Source.Application.Actions.GetNewsByIdAction import GetNewsByIdAction
from Source.Application.Actions.GetNewsListAction import GetNewsListAction

@app.route("/")
def hello():
    return make_response("Hello World!")

@app.route("/v1/news")
def get_news_list():
    return make_response(GetNewsListAction())

@app.route("/v1/news/<id>")
def get_news_by_id(id):
    return make_response(GetNewsByIdAction(id))

@app.route('/<path:path>')
def route_not_found(path):
    return make_response("Not Found", 404)
