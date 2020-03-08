from .server import *
from .response import make_response
from Source.Application.Actions.GetNewsByIdAction import GetNewsByIdAction
from Source.Application.Actions.GetReportByIdAction import GetReportByIdAction
from Source.Application.Actions.GetNewsListAction import GetNewsListAction

@app.route("/")
def hello():
    return make_response("Hello World!")

@app.route("/v1/news")
def get_shorten_news_list():
    return make_response(GetNewsListAction())

@app.route("/v1/news/all")
def get_news_list():
    return make_response(GetNewsListAction(all=True))

@app.route("/v1/news/<int:id>")
def get_news_by_id(id):
    return make_response(GetNewsByIdAction(id))

@app.route("/v1/reports/<int:id>")
def get_report_by_id(id):
    return make_response(GetReportByIdAction(id))

@app.route('/<path:path>')
def route_not_found(path):
    return make_response("Not Found", 404)
