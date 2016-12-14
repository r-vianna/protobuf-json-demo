import axios from 'axios';
import * as protobuf from 'protobufjs';

const testTextArea = document.querySelector('textarea.test-area');
let TestMessage = protobuf.load('./protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });


function buffer(count = 1) {
    return axios.get('/data/buffer', {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then((response) => {
            const data = TestMessage.decode(new Uint8Array(response.data));

            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return false; }

            return buffer(data.count);
        });
}

function json(count = 1) {
    return axios.get('/data/json', { params: { count } })
        .then((response) => {
            const data = response.data;

            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return false; }

            return json(data.count);
        });
}

export default {
    buffer,
    json
};
