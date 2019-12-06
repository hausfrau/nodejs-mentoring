"use strict";

var _common = require("./common");

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

input.on("error", function () {
    return console.error("Input file not Found!");
});

csv({
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