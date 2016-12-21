import results from '../results/results';
import test from '../test/dataCall';
import state from '../state/state';

const rangeInput = document.getElementById('range_input');
const rangeDisplay = document.getElementById('range_display');
const testForm = document.getElementById('test_form');

rangeInput.addEventListener('change', () => {
    rangeDisplay.innerHTML = rangeInput.value;
});

state.registerChangeEvent(() => {
    if (state.getState()) {
        testForm.elements[0].disabled = true;
    } else {
        testForm.elements[0].disabled = false;
    }
});

testForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const testType = testForm.querySelector('input[name="testType"]:checked').value;
    const end = Number(rangeInput.value);
    let i = 1;

    function runTest(type) {
        return test.buffer(type)
            .then(() => test.json(type))
            .then(() => {
                console.log(`pass ${i}`);
                if (i === end) { return false; }
                i += 1;
                return runTest(type);
            });
    }

    // Start the test
    Promise.resolve(results.clearResults())
        .then(() => { state.setState().inprogress(); })
        .then(() => runTest(testType))
        .then(() => results.setHeaders(['Server Response Time', 'UI Decode Time', 'Total Time', 'Data Size']))
        .then(results.setResultsJson)
        .then(results.setResultsBuffer)
        .then(results.validateResultTables)
        .then(results.calcDiffs)
        .then(() => { state.setState().complete(); })
        .catch((err) => {
            testForm.elements[0].disabled = false;
            console.log(`Error!!! ${err}`);
        });
});
