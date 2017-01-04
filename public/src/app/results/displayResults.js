import state from '../state/state';

const resultsSummary = document.getElementById('results_summary');
const resultsSummaryToggle = resultsSummary.querySelector('.results-summary-toggle');
const resultsSummaryDisplay = resultsSummary.querySelector('.results-summary-display');

state.registerChangeEvent(() => {
    if (state.getState()) {
        resultsSummary.disabled = true;
    } else {
        resultsSummary.disabled = false;
    }
});

function addResultSummary(results) {
    const div = document.createElement('div');
    div.classList.add('result-summary');

    results.forEach((result) => {
        const span = document.createElement('span');
        span.innerHTML = result;
        div.appendChild(span);
    });

    resultsSummaryDisplay.insertBefore(div, resultsSummaryDisplay.childNodes[0]);
    resultsSummary.classList.add('active');
}

resultsSummaryToggle.addEventListener('click', () => {
    resultsSummary.classList.toggle('active');
});

export default {
    addResultSummary
};
