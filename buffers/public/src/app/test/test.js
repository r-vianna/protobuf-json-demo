import axios from 'axios';
import protobuf from 'protobufjs';

const testTextArea = document.querySelector('textarea.test-area');

function loadMessage(response) {
    return protobuf.load('./protos/message.proto')
        .then((root) => {
            const TestMessage = root.lookup('testpackage.TestMessage');
            return TestMessage.decode(response.data)
        })
}

function init(count = 1) {
    return axios.get('/data', {
        params: {
            count
        },
        responseType: 'arraybuffer'
    })
        .then(loadMessage)
        .then((response) => {
            const data = response;
            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return; }

            return init(data.count);
        });
}

export default {
    init
}