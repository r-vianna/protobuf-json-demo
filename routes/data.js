const express = require('express');
const crypto = require('crypto');
const protobuf = require('protobufjs');

const router = express.Router();
let TestMessage = protobuf.load('./public/protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });

function getData(ct) {
    const limit = Math.pow(10, 6);
    const isFinal = Number(ct) >= limit;
    const count = isFinal ?
        limit :
        Math.round(Number(ct) * 1.5);
    const data = crypto.randomBytes(count).toString('hex');

    return {
        count,
        data,
        isFinal
    };
}

router.get('/buffer', (req, res, next) => {
    const data = getData(req.query.count);
    const msg = TestMessage.encode(data).finish();

    res.send(msg);
});

router.get('/json', (req, res, next) => {
    const data = getData(req.query.count);
    const msg = data;

    res.send(msg);
});

module.exports = router;
