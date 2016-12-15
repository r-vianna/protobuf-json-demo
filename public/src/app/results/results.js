import compare from './compareResults';

const resultsJson = {
    table: document.getElementById('results_json'),
    cells: {},
    results: []
};
const resultsBuffer = {
    table: document.getElementById('results_buffer'),
    cells: {},
    results: []
};

// --- Setup rest of result table object --- //
resultsJson.body = resultsJson.table.getElementsByTagName('tbody')[0];
resultsJson.header = resultsJson.table.getElementsByTagName('thead')[0];
resultsBuffer.body = resultsBuffer.table.getElementsByTagName('tbody')[0];
resultsBuffer.header = resultsBuffer.table.getElementsByTagName('thead')[0];
// --- End setup --- //

function setHeaders(labels) {
    [resultsJson.header, resultsBuffer.header].forEach((header) => {
        const row = header.insertRow(0);
        labels.forEach((label, index) => {
            const cell = row.insertCell(index);
            cell.innerHTML = label;
        });
    });
    return;
}

function storeResult(resultFor, data) {
    resultFor.results.push(data);
}

function setResults(resultTable) {
    const results = resultTable.results;

    results.forEach((result, index) => {
        const row = resultTable.body.insertRow(-1);

        Object.keys(result).forEach((key, ind) => {
            const cell = row.insertCell(ind);
            cell.innerHTML = result[key];
            if (Number(result[key])) {
                resultTable.cells[`${key}-${index}`] = {
                    cell,
                    value: Number(result[key])
                };
            }
        });
    });
}

function clearResults(clear = true) {
    [resultsJson, resultsBuffer].forEach((results) => {
        Object.keys(results).forEach((key) => {
            switch (key) {
                case 'table':
                    break;
                case 'cells':
                    results[key] = {};
                    break;
                case 'results':
                    results[key] = clear ? [] : results[key];
                    break;
                default:
                    results[key].innerHTML = '';
            }
        });
    });
    return;
}

function compareResults() {
    const jsonCells = resultsJson.cells;
    const bufferCells = resultsBuffer.cells;

    Object.keys(jsonCells).forEach((key) => {
        if (key === 'innerHTML') { // temp fix for bug
            return;
        }

        if (jsonCells[key].value === bufferCells[key].value) {
            jsonCells[key].cell.classList.add('equal');
            bufferCells[key].cell.classList.add('equal');
        } else if (jsonCells[key].value < bufferCells[key].value) {
            jsonCells[key].cell.classList.add('faster');
        } else {
            bufferCells[key].cell.classList.add('faster');
        }
    });
    return;
}

export default {
    storeResultJson(data) {
        storeResult(resultsJson, data);
    },
    storeResultBuffer(data) {
        storeResult(resultsBuffer, data);
    },
    setResultsJson() {
        setResults(resultsJson);
    },
    setResultsBuffer() {
        setResults(resultsBuffer);
    },
    displayDiffs() {
        compare.compareResults(resultsJson.results, resultsBuffer.results);
    },
    setHeaders,
    clearResults,
    compareResults
};
