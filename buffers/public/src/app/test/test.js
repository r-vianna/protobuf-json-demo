import axios from 'axios';
import * as protobuf from 'protobufjs';

const testTextArea = document.querySelector('textarea.test-area');
let TestMessage = protobuf.load('./protos/message.proto')
    .then((root) => {
        TestMessage = root.lookup('testpackage.TestMessage');
    });


function init(count = 1) {
    return axios.get('/data', {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then((response) => {
            const data = TestMessage.decode(response.data); //TestMessage.decode(new Uint8Array(response.data));
            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return; }

            return init(data.count);
        });
}

export default {
    init
}