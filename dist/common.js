'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var csv = exports.csv = require('csvtojson');
var csvFilePath = exports.csvFilePath = './csv/example.csv';
var txtFilePath = exports.txtFilePath = './txt/json.txt';
var path = exports.path = require("path");

var _require = require("fs"),
    createReadStream = _require.createReadStream,
    createWriteStream = _require.createWriteStream;

exports.createReadStream = createReadStream;
exports.createWriteStream = createWriteStream;
var input = exports.input = createReadStream(csvFilePath);
var output = exports.output = createWriteStream(txtFilePath);