var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    const isFinal = Number(req.query.count) >= 60000///Math.pow(10,6);
    const count = isFinal ?
        Number(req.query.count) :
        Math.round(Number(req.query.count) * 1.5);
    const data = crypto.randomBytes(count).toString('hex');
    res.send({
        count,
        data,
        isFinal
    });
});

module.exports = router;