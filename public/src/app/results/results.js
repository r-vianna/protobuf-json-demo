const resultsJson = {
    table: document.getElementById('results_json'),
    cells: {}
};
const resultsBuffer = {
    table: document.getElementById('results_buffer'),
    cells: {}
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

function setResult(resultTable, data) {
    const row = resultTable.body.insertRow(-1);
    const rowLength = resultTable.body.rows.length ?
        resultTable.body.rows.length - 1 :
        0;

    Object.keys(data).forEach((key, index) => {
        const cell = row.insertCell(index);
        cell.innerHTML = data[key];
        if (Number(data[key])) {
            resultTable.cells[`${key}-${rowLength}`] = {
                cell,
                value: Number(data[key])
            };
        }
    });
}

function clearResults() {
    [resultsJson, resultsBuffer].forEach((table) => {
        Object.keys(table).forEach((key) => {
            switch (key) {
                case 'table':
                    break;
                case 'cells':
                    table[key] = {};
                    break;
                default:
                    table[key].innerHTML = '';
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
    setResultJson(data) {
        setResult(resultsJson, data);
    },
    setResultBuffer(data) {
        setResult(resultsBuffer, data);
    },
    setHeaders,
    clearResults,
    compareResults
};
