from .server import *
from .response import make_response
from Source.Application.Actions.GetNewsByIdAction import GetNewsByIdAction
from Source.Application.Actions.GetReportByIdAction import GetReportByIdAction
from Source.Application.Actions.GetNewsListAction import GetNewsListAction
from Source.Infrastructure.Loggers.AccessLogger import AccessLogger
from Source.Domain.Exceptions.NotFoundException import NotFoundException
from Source.Domain.Exceptions.MalformedRequestException import MalformedRequestException
from flask import request, g
import time


@app.before_request
def check_identity():
    g.start = time.time()
    identity = request.headers.get('identity')
    if identity is None or identity == "":
        return make_response("Please provide us your identity in header for logging.", 401)

@app.after_request
def after_request(response):
    time_used = time.time() - g.start
    identity = request.headers.get('identity')
    identity = '<Unknown>' if identity is None or identity == "" else identity
    if response.response:
        status = response.status_code
        logger = AccessLogger()
        logger.write(identity, request.path, status, time_used * 1000)
    return response

@app.errorhandler(NotFoundException)
def handle_not_found(e):
    return make_response(e, e.code)

@app.errorhandler(MalformedRequestException)
def handle_bad_request(e):
    return make_response(e, e.code)

@app.route("/")
def hello():
    return make_response("Welcome to our API - APInteresting")

@app.route("/v1/news")
def get_shorten_news_list():
    return make_response(GetNewsListAction(params=request.args))

@app.route("/v1/news/all")
def get_news_list():
    return make_response(GetNewsListAction(all=True, params=request.args))

@app.route("/v1/news/<id>")
def get_news_by_id(id):
    return make_response(GetNewsByIdAction(id))

@app.route("/v1/reports/<id>")
def get_report_by_id(id):
    return make_response(GetReportByIdAction(id))

@app.route('/<path:path>')
def route_not_found(path):
    return make_response("Not Found", 404)
