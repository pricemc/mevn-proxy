var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var proxy = require('redbird')({port: 80});
proxy.register("proxy.mattcprice.com", "localhost:3001");
proxy.register("api.mattcprice.com", "localhost:3001/api");
proxy.register("dash.mattcprice.com", "localhost:3001/dash");
proxy.notFound(
  function(req, res){
      res.statusCode = 502;
      res.write('Bad Request');
      res.end();
  }
);

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var domainsRouter = require('./routes/domains');
var projectsRouter = require('./routes/projects');
var dashRouter = require('./routes/dash');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

/* API */
app.use('/api/domains', domainsRouter);
app.use('/api/projects', projectsRouter);

module.exports = app;
