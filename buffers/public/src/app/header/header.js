const header = document.querySelector('header.viewport');
const messages = [];
let count = 0;
let domMessages;

['Ok...', 'Lets Begin...'].forEach((message) => {
    const domMessage = document.createElement('h1');
    domMessage.innerHTML= `${message}`;
    header.appendChild(domMessage);
    messages.push(domMessage);
});

function swapHeader() {
    return new Promise((fulfill, reject) => {
        messages[count].classList.add('transition');
        count++;
        setTimeout(() => {
            fulfill();
        }, 2000);
    });
}

function init() {
    return Promise.resolve()
        .then(swapHeader)
        .then(swapHeader);
}

function results(time) {
    const resultMessage = document.createElement('h1');
    resultMessage.innerHTML = `Test finished in ${time/1000} seconds`;
    resultMessage.classList.add('results');
    header.appendChild(resultMessage);
}

export default {
    init,
    results
}
