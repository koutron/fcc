// server.js
// where your node router starts
// init project
var mongo = require('mongodb');
var mongoose = require('mongoose');
var request = require('request');
var rp = require('request-promise');
var express = require('express');
var path = require('path');
var router = express.Router();




router.use('/', express.static(path.join(__dirname, '../public')));
router.get('/', function (request, response) {
  response.sendFile(__dirname + '/abstraction.html');
});

//mongoose.connect('mongodb://koutron:poopoo12@ds129281.mlab.com:29281/koutron');
var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {  //connect to db
  var querySchema = new mongoose.Schema({query : String, date: { type: Date, default: Date.now }});  //setup schema / model
  var queryModel = mongoose.model('searchHistory', querySchema);
  router.get('/history', (req, res) => {  //searchHistory query and routing
    var searchHistory = queryModel.find().sort({date : 'descending'}).limit(10).exec(function(err, posts){
  return JSON.stringify(posts);
});
searchHistory.then(data => res.send(data));
});



router.get('/search/:query', function(req, res) {
  if(req.url.indexOf('?offset=') !== -1){
  var i = req.url.indexOf('?offset=');
  var offset = req.url[i+8];
  }
if(req.params.query){
  var queryDate = new Date();
var saveQuery = new queryModel({query : req.params.query});

saveQuery.save();
}
var options = {uri: 'https://api.imgur.com/3/gallery/search/top/all/' + (offset ? offset : 1) + '/?q=' + req.params.query,
headers:{'Authorization':'Client-ID e80864a75efd3c6'}, json: true};
var images = rp(options)
.then(function (repos) {
      return repos;
})
.catch(function (err) {
        console.log(err);
});
images.then(imgObj => res.send((imgObj.data.map(img => [img.link, img.title]))));

});
});


module.exports = router;
