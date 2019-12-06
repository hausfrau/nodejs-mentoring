import {csv, path, createReadStream, createWriteStream} from "./common";

const csvFilePath = './csv/example.csv';
const txtFilePath = './txt/json.txt';

const input = createReadStream(csvFilePath);
const output = createWriteStream(txtFilePath);

input.on("error", () => console.error("Input file not Found!"));

csv({
    ignoreColumns: /(Amount)/,
    headers: ['book', 'author', 'price']
})
    .fromStream(input)
    .subscribe(
        jsonData => {
            return new Promise((resolve, reject) => {
                output.write(JSON.stringify(jsonData) + "\n", reject);
                resolve();
            });
        },
        e => console.error(e),
        () => console.log("Finished")
    );
