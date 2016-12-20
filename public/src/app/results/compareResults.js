function compareResults(jsonData, bufferData) {
    const results = [];

    jsonData.forEach((row, index) => {
        Object.keys(row).forEach((key, ind) => {
            if (key.indexOf('decodeTime') !== -1) { return; }
            const diff = jsonData[index][key] - bufferData[index][key];
            if (!results[ind]) { results[ind] = { title: key, value: 0 }; }
            results[ind].value += ((diff / bufferData[index][key]) * 100);
            results[ind].value = Number(results[ind].value);
        });
    });

/*
    There is no UI Decode Time for json
    so we will remove this from the result array
*/
    for (let i = 0; i < results.length; i++) {
        if (!results[i]) { results.splice(i, 1); }
        results[i].value /= jsonData.length;
    }

    results.forEach((result) => {
        let label = result.value > 0 ? ' Percent Decrease in ' : ' Percent Increase in ';
        label = Math.abs(result.value).toFixed(2) + label;
        label += result.title.replace(/([A-Z])/g, ' $1').trim();
        label += ` over ${jsonData.length} data calls`;

        console.log(label);
    });
}

export default {
    compareResults
};

