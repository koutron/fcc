var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validUrl = require('valid-url');
var path = require('path');
var keys = require('../keys.js');

mongoose.connect(keys.mongodbKey);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED');
  var urlSchema = mongoose.Schema({
    longUrl : String,
    bitUrl : String
  });
  var url = mongoose.model('url', urlSchema);



  router.get('*', (req, res) => {
  var path = (req.path.toString().slice(1));
    if(path.length == 6){
      return url.findOne({bitUrl : path}, (err, doc) => {
      //if(!doc) return res.send('Invalid Bitlink URL');
      if(doc) res.redirect(doc.longUrl);
      else res.send('Invalid Bitlink.');

      });
    }
    else{
  return url.findOne({longUrl : path}, (err, docs) => {
    if(validUrl.isUri(path)){
      console.log('URL IS VALID');

    if(!docs){
        console.log("CREATING NEW BITLINK");
        var newUrl = new url({longUrl : path});
  return newUrl.save((err, urlInfo) => {
    urlInfo.bitUrl = urlInfo.id.slice(-6);
    urlInfo.save();
    res.send("Your Bitlink has been created at http://kouroscodes.com/fcc/bitlink/" + urlInfo.bitUrl);
  });
      }
      if(docs){
        console.log("BITLINK ALREADY EXISTS");
        res.send('Bitlink already exists at http://kouroscodes.com/fcc/bitlink/' + docs.bitUrl);
      }
    }
    else{
      res.send("URL is invalid.");
    }
  });

    }//////////











res.end();
}); //router.get
}); //db.once



router.use('/', express.static(path.join(__dirname, '../public')));
router.get("/", function (request, response) {
  response.sendFile(__dirname + '/bitlink.html');
});

module.exports = router;
