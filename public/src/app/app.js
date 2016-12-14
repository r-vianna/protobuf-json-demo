import results from './results/results';
import header from './header/header';
import test from './test/test';
import '../scss/page.scss';

const testStart = document.querySelector('#test_start button');
// let startTime;
// let endTime;

// header.init()
//     .then(() => startTime = new Date())
//     .then(() => test.buffer())
//     .then(() => endTime = new Date())
//     .then(() => header.results(endTime - startTime))
//     .catch((err) => {
//         console.log(`Error!!! ${err}`);
//     });

testStart.addEventListener('click', (e) => {
    e.preventDefault();
    Promise.resolve(results.clearResults())
        .then(() => test.clearDOM())
        .then(() => results.setHeaders(['Time', ' UI Rendered']))
        .then(() => test.json())
        .then(() => test.clearDOM())
        .then(() => test.buffer())
        .then(() => results.compareResults())
        .catch((err) => {
            console.log(`Error!!! ${err}`);
        });
});
