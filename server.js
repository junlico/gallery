'use strict'
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var router      = require('./api/router/galleryRouter');
var app         = express();
var port        = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`api running on port ${port}`);
});



