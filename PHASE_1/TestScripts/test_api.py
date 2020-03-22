import os
import tempfile

import pytest, requests, json

api_base = "https://apinteresting.xyz/v1"
identity_header = {'identity': 'test'}

def _parse_time(t, format='%Y-%m-%dT%H:%M:%S'):
    import datetime, time
    t = datetime.datetime.strptime(t, format).timetuple()
    return time.mktime(t)


def test_response_format():
    global api_base, identity_header
    header = {}
    url = "{}/test".format(api_base)
    response = requests.get(url, headers=header)
    assert response.status_code == 401
    response = json.loads(response.content.decode("utf-8"))
    assert isinstance(response, object)
    assert 'apiBy' in response
    assert 'resourceFrom' in response
    assert 'responseTime' in response
    assert response['apiBy'] == 'APInteresting'
    assert response['resourceFrom'] == 'FluTracker'
    assert isinstance(response['responseTime'], int)
    assert 'data' in response
    assert response['data'] == "Please provide us your identity in header for logging."

def test_not_exists_identity():
    global api_base, identity_header
    header = {}
    url = "{}/news".format(api_base)
    response = requests.get(url, headers=header)
    assert response.status_code == 401

    response = json.loads(response.content.decode("utf-8"))
    assert response['data']  == "Please provide us your identity in header for logging."

def test_not_exists_url():
    global api_base, identity_header
    url = "{}/not_exists".format(api_base)
    response = requests.get(url, headers=identity_header)
    assert response.status_code == 404
    response = json.loads(response.content.decode("utf-8"))
    assert 'Not Found' in response['data']

def test_get_news_error_date_format1():
    global api_base, identity_header
    payload = {'start_date': '123'}
    url = "{}/news".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_error_date_format2():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-29 00:53:00'}
    url = "{}/news".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_error_date_format3():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-28T08:50:00'}
    url = "{}/news".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_all_error_date_format1():
    global api_base, identity_header
    payload = {'start_date': '123'}
    url = "{}/news/all".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_all_error_date_format2():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-29 00:53:00'}
    url = "{}/news/all".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_all_error_date_format3():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-28T08:50:00'}
    url = "{}/news/all".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 400
    response = json.loads(response.content.decode("utf-8"))
    assert 'Malformed Request' in response['data']

def test_get_news_correct():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-29T18:00:00'}
    url = "{}/news".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200

    response = json.loads(response.content.decode("utf-8"))
    content = response['data']
    assert isinstance(content, list)
    for news in content:
        assert isinstance(news, object)
        if "main_text" in news:
            assert len(news['main_text']) < 80
        assert "reports" not in news
        assert "id" in news
        assert "date_of_publication" in news
        start = _parse_time('2020-02-29T00:52:00')
        end = _parse_time('2020-02-29T18:00:00')
        pub = _parse_time(news['date_of_publication'], format='%Y-%m-%d %H:%M:%S')
        assert start < pub < end

def test_get_news_all_correct():
    global api_base, identity_header
    payload = {'start_date': '2020-02-29T00:52:00', 'end_date': '2020-02-29T18:00:00'}
    url = "{}/news/all".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200

    response = json.loads(response.content.decode("utf-8"))
    content = response['data']
    assert isinstance(content, list)
    for news in content:
        assert isinstance(news, object)
        assert "reports" not in news
        assert "id" in news
        assert "date_of_publication" in news
        start = _parse_time('2020-02-29T00:52:00')
        end = _parse_time('2020-02-29T18:00:00')
        pub = _parse_time(news['date_of_publication'], format='%Y-%m-%d %H:%M:%S')
        assert start < pub < end

def test_get_all_location_correct():
    global api_base, identity_header
    payload = {
        'start_date': '2020-02-29T00:52:00',
        'end_date': '2020-02-29T18:00:00',
        'location': 'canada'
    }
    url = "{}/news/all".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200

    response = json.loads(response.content.decode("utf-8"))
    content = response['data']
    assert isinstance(content, list)
    for news in content:
        assert isinstance(news, object)
        assert "reports" not in news
        assert "id" in news
        if ("main_text" in news):
            assert "canada" in news["main_text"].lower()

def test_get_report_and_article_by_id():
    global api_base, identity_header
    payload = {
        'start_date': '2020-02-29T00:52:00',
        'end_date': '2020-02-29T18:00:00',
        'location': 'canada'
    }
    url = "{}/news".format(api_base)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200

    response = json.loads(response.content.decode("utf-8"))
    content = response['data']
    assert isinstance(content, list)
    id = None
    for news in content:
        assert isinstance(news, object)
        assert "reports" not in news
        assert "id" in news
        id = news['id']
        break

    url = "{}/news/{}".format(api_base, id)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200
    response = json.loads(response.content.decode("utf-8"))
    news = response['data']
    assert isinstance(news, object)
    assert "reports" in news
    assert "id" in news
    assert id == news['id']

    url = "{}/reports/{}".format(api_base, id)
    response = requests.get(url, params=payload, headers=identity_header)
    assert response.status_code == 200
    response = json.loads(response.content.decode("utf-8"))
    reports = response['data']
    assert isinstance(reports, list)

