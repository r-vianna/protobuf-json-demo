import * as protobuf from 'protobufjs';
import present from 'present';
import axios from 'axios';
import results from '../results/results';

let TestMessage = protobuf.load('./protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });

let TestTallMessage = protobuf.load('./protos/tallMessage.proto')
    .then((root) => {
        TestTallMessage = root.lookup('testtallpackage.TestTallMessage');
    });

function buffer(count = 1) {
    const startTime = present();
    return axios.get('/data/buffer/tall', {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then((response) => {
            const serverResponseTime = present();
            // const data = TestMessage.decode(new Uint8Array(response.data));
            const data = TestTallMessage.decode(new Uint8Array(response.data));
            const dataProcessTime = present();

            if (data.isFinal) { return false; }

            results.storeResultBuffer({
                responseTime: serverResponseTime - startTime,
                decodeTime: dataProcessTime - serverResponseTime,
                totalTime: dataProcessTime - startTime,
                packageSize: response.data.byteLength
            });
            return buffer(data.count);
        });
}

function json(count = 1) {
    const startTime = present();
    return axios.get('/data/json/tall', {
        params: {
            count
        },
        responseType: 'text'
    })
        .then((response) => {
            const serverResponseTime = present();
            const data = response.data;
            const dataProcessTime = present();

            if (data.isFinal) { return false; }

            results.storeResultJson({
                responseTime: serverResponseTime - startTime,
                decodeTime: dataProcessTime - serverResponseTime,
                totalTime: dataProcessTime - startTime,
                packageSize: JSON.stringify(response.data).length
            });
            return json(data.count);
        });
}

export default {
    buffer,
    json
};
