'use strict';

var _common = require('./common');

var csvFilePath = './csv/example.csv';
var txtFilePath = './txt/json.txt';

var input = (0, _common.createReadStream)(csvFilePath);
var output = (0, _common.createWriteStream)(txtFilePath);

input.on("error", function () {
    return console.error("Input file not Found!");
});

(0, _common.csv)({
    ignoreColumns: /(Amount)/,
    headers: ['book', 'author', 'price']
}).fromStream(input).subscribe(function (jsonData) {
    return new Promise(function (resolve, reject) {
        output.write(JSON.stringify(jsonData) + "\n", reject);
        resolve();
    });
}, function (e) {
    return console.error(e);
}, function () {
    return console.log("Finished");
});