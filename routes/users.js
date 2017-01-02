var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '179.188.16.83',
    user     : 'mdet_ecco',
    password : 'mdet_ecc@',
    database : 'mdet_ecco',
    debug    :  false
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
