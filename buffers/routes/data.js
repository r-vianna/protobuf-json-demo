const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const protobuf = require('protobufjs');
let TestMessage = protobuf.load('./public/protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    })

router.get('/', function (req, res, next) {
    const isFinal = Number(req.query.count) >= 60000//Math.pow(10, 4);
    const count = isFinal ?
        Number(req.query.count) :
        Math.round(Number(req.query.count) * 1.5);
    const data = crypto.randomBytes(count).toString('hex');
    const msg = TestMessage.encode({
        count,
        data,
        isFinal
    }).finish();

    res.send(msg);
});

module.exports = router;