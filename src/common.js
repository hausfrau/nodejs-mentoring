export const csv = require('csvtojson');
export const csvFilePath = './csv/example.csv';
export const txtFilePath = './txt/json.txt';
export const path = require("path");
export const {createReadStream, createWriteStream} = require("fs");
export const input = createReadStream(csvFilePath);
export const output = createWriteStream(txtFilePath);