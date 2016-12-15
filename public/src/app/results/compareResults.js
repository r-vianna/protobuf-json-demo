function compareResults(jsonData, bufferData) {
    const results = [];

    jsonData.forEach((row, index) => {
        Object.keys(row).forEach((key, ind) => {
            if (key.indexOf('decodeTime') !== -1) { return; }
            const diff = jsonData[index][key] - bufferData[index][key];
            if (!results[ind]) { results[ind] = []; }
            results[ind] += ((diff / bufferData[ind][key]) * 100);
            results[ind] = Number(results[ind]);
        });
    });

    for (let i = 0; i < results.length; i++) {
        if (!results[i]) { results.splice(i, 1); }
        results[i] /= jsonData.length;
    }

    console.log(results);
}

export default {
    compareResults
};

