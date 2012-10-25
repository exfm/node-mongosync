import requests

HOST = None


def configure(host):
    global HOST
    HOST = host


def ping(collection, id):
    global HOST
    requests.post("{}/{}/{}".format(HOST, collection, id))


def flush(collection):
    global HOST
    requests.get("{}/flush/{}".format(HOST, collection))
