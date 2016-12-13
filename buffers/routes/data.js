const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const protobuf = require('protobufjs');

router.get('/', function (req, res, next) {
    const isFinal = Number(req.query.count) >= Math.pow(10, 6);
    const count = isFinal ?
        Number(req.query.count) :
        Math.round(Number(req.query.count) * 1.5);
    const data = crypto.randomBytes(count).toString('hex');

    protobuf.load('./public/protos/message.proto')
        .then((root) => {
            console.log('im here');
            const TestMessage = root.lookup('testpackage.TestMessage');
            // console.log(TestMessage);
            const message = TestMessage.create({
                count,
                data,
                isFinal
            });
            console.log('---->',message);
            return TestMessage.encode(message).finish()

        })
        .then((msg) => {
            console.log('111',msg);
            return res.send(msg);
        })
        .catch((err) => res.status(500).send({error: err}));
});

module.exports = router;