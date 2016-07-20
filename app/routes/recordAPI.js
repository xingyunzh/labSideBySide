var express = require('express');
var router = express.Router();
var recordController = require("../controller/recordController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('record root');
})

router.post('/save', recordController.saveResult);
router.get('/getbyemail/:email', recordController.getByEmail);

module.exports = router;
