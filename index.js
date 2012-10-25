"use strict";

var leveldb = require('leveldb'),
    express = require("express");

var app = module.exports = express();

// Configuration
app.configure(function(){
    app.use(app.router);
});

app.configure("development", function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function(){
    app.use(express.errorHandler());
});

var db;
leveldb.open("mongosync.db", {create_if_missing: true}, function(err, _db){
    db = _db;
});

app.get('/flush/:collection', function(req, res){
    var items = [];
    db.iterator({}, function(err, it){
        it.forRange(req.param('collection') + '-', function(err, key, value){
            items.push(JSON.parse(value));
            db.del(key);
        }, function(){
            res.send(items);
        });
    });
});

app.all('/:collection/:id', function(req, res, next){
    var key = [req.param('collection'), '-', req.param('id')].join(''),
        val;

    db.get(key, function(err, value){
        if(value === null){
            val = {
                'first_seen': new Date().toString(),
                'last_seen': new Date().toString(),
                'hits': 1,
                'id': req.param('id')
            };
        }
        else{
            val = JSON.parse(value);
            val.last_seen = new Date().toString();
            val.hits++;
        }
        db.put(key, JSON.stringify(val), function(err) {
            res.send(val);
        });
    });
});

app.listen(8080, function(err, item){
    console.log('Syncer listening on 8080');
});
