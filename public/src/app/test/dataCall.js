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
let TestComplexMessage; // future work

function findProto(type) {
    let proto;
    switch (type) {
        case 'tall':
            proto = TestTallMessage;
            break;
        case 'complex':
            proto = TestComplexMessage;
            break;
        default:
            proto = TestMessage;
            break;
    }
    return proto;
}

function buffer(type, count = 0) {
    const proto = findProto(type);
    const startTime = present();
    const uri = type ? `/${type}` : '';
    return axios.get(`/data/buffer${uri}`, {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then((response) => {
            const serverResponseTime = present();
            const data = proto.decode(new Uint8Array(response.data));
            const dataProcessTime = present();

            if (count) { // ignore the first pass
                results.storeResultBuffer({
                    ServerResponseTime: serverResponseTime - startTime,
                    decodeTime: dataProcessTime - serverResponseTime,
                    TotalTime: dataProcessTime - startTime,
                    DataSize: response.data.byteLength
                });
            }

            if (data.isFinal) { return false; }
            return buffer(type, data.count);
        });
}

function json(type, count = 0) {
    const startTime = present();
    const uri = type ? `/${type}` : '';
    return axios.get(`/data/json${uri}`, {
        params: {
            count
        },
        responseType: 'text'
    })
        .then((response) => {
            const serverResponseTime = present();
            const data = response.data;
            const dataProcessTime = present();

            if (count) { // ignore the first pass
                results.storeResultJson({
                    ServerResponseTime: serverResponseTime - startTime,
                    decodeTime: dataProcessTime - serverResponseTime,
                    TotalTime: dataProcessTime - startTime,
                    DataSize: JSON.stringify(response.data).length
                });
            }

            if (data.isFinal) { return false; }
            return json(type, data.count);
        });
}

export default {
    buffer,
    json
};
