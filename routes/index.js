var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CURD OPERATIONS' });
});

router.get('/get-data', function(req, res, next){
  var resultArray=[];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor=db.collection('userdata').find();
    cursor.forEach(function(doc, err){
      assert.equal(null,err);
      resultArray.push(doc);
    }, function(){
       db.close();
       res.render('index', {items: resultArray});
    });
    });
});

router.post('/insert', function(req, res, next){
  var item =
  {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    //name of the collection in which want to insert data
    db.collection('userdata').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item Inserted');
      db.close();
    });
  });
  res.redirect('/');
});

router.post('/update', function(req, res, next){
  var item =
  {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  var id = req.body.id;
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    //name of the collection in which want to update data
    db.collection('userdata').updateOne({"_id":objectId(id)},{$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item Updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next){
  var id = req.body.id;
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    //name of the collection in which want to update data
    db.collection('userdata').deleteOne({"_id":objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
