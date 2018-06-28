var express = require('express');
var router = express.Router();

var domainsRouter = require('./domains');
var projectsRouter = require('./projects');

/* ERROR*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
