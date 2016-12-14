import results from '../results/results';
import * as protobuf from 'protobufjs';
import axios from 'axios';

const testTextArea = document.querySelector('textarea.test-area');
let TestMessage = protobuf.load('./protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });


function buffer(count = 1) {
    const start = new Date();
    return axios.get('/data/buffer', {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then((response) => {
            const serverResponseTime = new Date() - start;
            const data = TestMessage.decode(new Uint8Array(response.data));

            testTextArea.innerHTML = data.data;

            if (data.isFinal) { return false; }

            results.setResultBuffer({
                time: serverResponseTime,
                uiUpdate: new Date() - start
            });
            return buffer(data.count);
        });
}

function json(count = 1) {
    const start = new Date();
    return axios.get('/data/json', { params: { count } })
        .then((response) => {
            const serverResponseTime = new Date() - start;
            const data = response.data;

            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return false; }

            results.setResultJson({
                time: serverResponseTime,
                uiUpdate: new Date() - start
            });
            return json(data.count);
        });
}

function clearDOM() {
    testTextArea.innerHTML = '';
    return;
}

export default {
    buffer,
    clearDOM,
    json
};
