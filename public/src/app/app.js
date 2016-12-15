import results from './results/results';
import test from './test/test';
import '../scss/page.scss';

const testStart = document.querySelector('#test_start button');

testStart.addEventListener('click', (e) => {
    e.preventDefault();
    const end = 50;
    let i = 1;
    function runTest() {
        return Promise.resolve()
            .then(() => test.json())
            .then(() => test.buffer())
            .then(() => {
                console.log(`pass ${i}`);
                if (i === end) { return false; }
                i += 1;
                return runTest();
            })
            .catch((err) => {
                console.log(`Error!!! ${err}`);
            });
    }

    // Start the test
    Promise.resolve(results.clearResults)
        .then(runTest)
        .then(() => results.setHeaders(['Server Response Time', 'UI Decode Time', 'Total Time', 'Data Size']))
        .then(results.setResultsJson)
        .then(results.setResultsBuffer)
        .then(results.compareResults)
        .then(results.displayDiffs);
});

