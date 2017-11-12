var express = require('express');
var multer  = require('multer');
var router = express.Router();
var storage = multer.memoryStorage();
var upload = multer({storage: storage});
var path = require('path');

router.use('/', express.static(path.join(__dirname, '../public')));
router.get("/", function (request, response) {
  response.sendFile(__dirname + '/metadata.html');
});

router.post('/getfile', upload.single('fileupload'), function (req, res) {
  res.json({"name": req.file.originalname, "type": req.file.mimetype, "size": req.file.size});
});

module.exports = router;
