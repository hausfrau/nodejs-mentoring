import * as common from './common';

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
