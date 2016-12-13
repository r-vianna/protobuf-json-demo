import axios from 'axios';

const testTextArea = document.querySelector('textarea.test-area');

function init(count = 1) {
    return axios.get('/data', { params: { count } })
        .then((response) => {
            const data = response.data;
            testTextArea.innerHTML = data.data;
            if (data.isFinal) { return; }

            return init(data.count);
        });
}

export default {
    init
}