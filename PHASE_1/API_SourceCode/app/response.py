import json, flask, time

def to_json_handler(Obj):
    if hasattr(Obj, 'to_dict'):
        return Obj.to_dict()
    else:
        raise TypeError('Object of type %s with value of %s is not JSON serializable' % (type(Obj), repr(Obj)))


def make_response(data, status_code=200, extra_headers={}):
    response = flask.make_response()
    response.status_code = status_code
    data = {
        # "status": status_code,
        "data": data,
        "apiBy": "APInteresting",
        "resourceFrom": "FluTracker",
        "responseTime": time.strftime("%d %b %Y %H:%M:%S +0000", time.gmtime())
    }
    json_data = json.dumps(data, default=to_json_handler)
    response.set_data(json_data)

    response.headers['Content-Type'] = 'application/json'
    for key in extra_headers.keys():
        response.headers[key] = extra_headers[key]

    return response
