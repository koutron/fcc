var useragent = require('useragent');
var express = require('express');
var ip = require('ip');
var path = require('path');
var router = express.Router();
console.log('headerparser');
router.get('/info', function(req, res){
var agent = useragent.parse(req.headers['user-agent']);
  res.send(agent.toString() + '<br>' + ip.address());
});
router.get('/test'), (req, res) => {
  console.log("fuck node");
  res.send('test');
};
router.use('/', express.static(path.join(__dirname, '../public')));
router.get('/', function (request, response) {
  response.sendFile(__dirname + '/headerparser.html');
});



//router.use(express.static('public'));
//router.get("/", function (request, response) {
//  response.sendFile(__dirname + '/views/index.html');
//});



module.exports = router;
