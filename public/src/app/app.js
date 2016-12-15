import results from './results/results';
import test from './test/test';
import '../scss/page.scss';

const testStart = document.querySelector('#test_start button');

testStart.addEventListener('click', (e) => {
    e.preventDefault();
    Promise.resolve(results.clearResults())
        .then(() => results.setHeaders(['Server Response Time', 'UI Decode Time', 'Total Time', 'Data Size']))
        .then(() => test.json())
        .then(() => test.buffer())
        .then(results.setResultsJson)
        .then(results.setResultsBuffer)
        .then(() => results.compareResults())
        .catch((err) => {
            console.log(`Error!!! ${err}`);
        });
});
