const express = require('express');
const crypto = require('crypto');
const protobuf = require('protobufjs');

const router = express.Router();
let TestMessage = protobuf.load('./public/protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });
let TestTallMessage = protobuf.load('./public/protos/tallMessage.proto')
    .then((root) => {
        TestTallMessage = root.lookup('testtallpackage.TestTallMessage');
    });

function getData(ct) {
    const limit = Math.pow(10, 6);
    const isFinal = Number(ct) >= limit;
    const count = isFinal ?
        limit :
        Math.round(Number(ct) * 1.5);
    const data = crypto.randomBytes(count).toString('hex');

    return {
        count: count === Number(ct) ? count + 1 : count,
        data,
        isFinal
    };
}

function getTallData(ct) {
    const limit = Math.pow(10, 5);
    const isFinal = Number(ct) >= limit;
    const count = isFinal ?
        limit :
        Math.round(Number(ct) * 1.5);
    const dataKey = crypto.randomBytes(count).toString('hex');
    const data = {};

    for (let i = 0; i < 25; i++) {
        data[`data${i}`] = dataKey;
    }

    data.count = count === Number(ct) ? count + 1 : count;
    data.isFinal = isFinal;

    return data;
}

router.get('/buffer', (req, res, next) => {
    const data = getData(req.query.count);
    const msg = TestMessage.encode(data).finish();

    res.send(msg);
});

router.get('/buffer/tall', (req, res, next) => {
    const data = getTallData(req.query.count);
    const msg = TestTallMessage.encode(data).finish();

    res.send(msg);
});

router.get('/json', (req, res, next) => {
    const data = getData(req.query.count);
    const msg = data;

    res.send(msg);
});

router.get('/json/tall', (req, res, next) => {
    const data = getTallData(req.query.count);
    const msg = data;

    res.send(msg);
});

module.exports = router;
