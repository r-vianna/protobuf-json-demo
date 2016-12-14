import header from './header/header';
import test from './test/test';
import '../scss/page.scss';
let startTime;
let endTime;

header.init()
    .then(() => startTime = new Date())
    .then(() => test.buffer())
    .then(() => endTime = new Date())
    .then(() => header.results(endTime - startTime))
    .catch((err) => {
        console.log(`Error!!! ${err}`);
    });