# mongosync

Just a little leveldb app you can ping when documents are modified and then flush out at some point to sync them in another data source.

## Usage

Start server:

    node index.js

Hit some things:

    curl http://localhost:8080/song/1
    curl http://localhost:8080/song/1
    curl http://localhost:8080/song/1
    curl http://localhost:8080/song/2
    curl http://localhost:8080/song/3
    curl http://localhost:8080/user/jm
    curl http://localhost:8080/user/jm
    curl http://localhost:8080/user/lucas

Which spits back:

    $ curl http://localhost:8080/song/1
    {
      "first_seen": "Thu Oct 25 2012 16:08:39 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:29 GMT-0400 (EDT)",
      "hits": 3,
      "id": 1
    }
    $ curl http://localhost:8080/song/1
    {
      "first_seen": "Thu Oct 25 2012 16:08:39 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 4,
      "id": 1
    }
    $ curl http://localhost:8080/song/1
    {
      "first_seen": "Thu Oct 25 2012 16:08:39 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 5,
      "id": 1
    }
    $ curl http://localhost:8080/song/2
    {
      "first_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 1,
      "id": 2
    }
    $ curl http://localhost:8080/song/3
    {
      "first_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 1,
      "id": 3
    }
    $ curl http://localhost:8080/user/jm
    {
      "first_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 1,
      "id": null
    }
    $ curl http://localhost:8080/user/jm
    {
      "first_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:30 GMT-0400 (EDT)",
      "hits": 2,
      "id": null
    }
    $ curl http://localhost:8080/user/lucas
    {
      "first_seen": "Thu Oct 25 2012 16:13:33 GMT-0400 (EDT)",
      "last_seen": "Thu Oct 25 2012 16:13:33 GMT-0400 (EDT)",
      "hits": 1,
      "id": null
    }

Flush user and song collections

    curl http://localhost:8080/flush/user
    curl http://localhost:8080/flush/song


Which gives back

    $ curl http://localhost:8080/flush/user
    [
      {
        "first_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "last_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "hits": 2,
        "id": "jm"
      },
      {
        "first_seen": "Thu Oct 25 2012 16:17:17 GMT-0400 (EDT)",
        "last_seen": "Thu Oct 25 2012 16:17:17 GMT-0400 (EDT)",
        "hits": 1,
        "id": "lucas"
      }
    ]
    $ curl http://localhost:8080/flush/user
    $ curl http://localhost:8080/flush/song
    [
      {
        "first_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "last_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "hits": 3,
        "id": "1"
      },
      {
        "first_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "last_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "hits": 1,
        "id": "2"
      },
      {
        "first_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "last_seen": "Thu Oct 25 2012 16:17:16 GMT-0400 (EDT)",
        "hits": 1,
        "id": "3"
      }
    ]


## License
MIT

