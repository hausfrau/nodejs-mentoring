const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './csv/example.csv';
const txtFilePath = './txt/json.txt';
let jsonArray;

fs.openSync(txtFilePath, 'w');

(async () => {
    jsonArray = await csv().fromFile(csvFilePath);
    jsonArray.forEach((line) => {
        fs.appendFile(txtFilePath, JSON.stringify(line)+'\n', function (err) {
            if (err) throw err;
        });
    })
})()
    .catch((err) => {
        console.log(err);
    });