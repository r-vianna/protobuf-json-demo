import results from '../results/results';
import test from '../test/dataCall';

const rangeInput = document.getElementById('range_input');
const rangeDisplay = document.getElementById('range_display');
const testForm = document.getElementById('test_form');

rangeInput.addEventListener('change', () => {
    rangeDisplay.innerHTML = rangeInput.value;
});

testForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const testType = testForm.querySelector('input[name="testType"]:checked').value;
    const end = Number(rangeInput.value);
    let i = 1;

    function runTest(type) {
        return test.json(type)
            .then(() => test.buffer(type))
            .then(() => {
                console.log(`pass ${i}`);
                if (i === end) { return false; }
                i += 1;
                return runTest(type);
            });
    }

    // Start the test
    Promise.resolve(results.clearResults())
        .then(() => { testForm.elements[0].disabled = true; })
        .then(() => runTest(testType))
        .then(() => results.setHeaders(['Server Response Time', 'UI Decode Time', 'Total Time', 'Data Size']))
        .then(results.setResultsJson)
        .then(results.setResultsBuffer)
        .then(results.validateResultTables)
        .then(results.calcDiffs)
        .then(() => { testForm.elements[0].disabled = false; })
        .catch((err) => {
            console.log(`Error!!! ${err}`);
        });
});
