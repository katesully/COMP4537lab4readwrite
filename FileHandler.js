//LLMs were used in the creation of this code

const fs = require('fs');
const path = require('path');

class FileHandler {
    constructor(fileName) {
        this.filePath = path.join(__dirname, fileName);
    }

    appendToFile(text) {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.filePath, text + '\n', (err) => {
                if (err) {
                    return reject('Error writing to file.');
                }
                resolve(`Text "${text}" appended to ${this.filePath}`);
            });
        });
    }

    readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return reject(`File "${this.filePath}" not found.`);
                    }
                    return reject('Error reading file.');
                }
                resolve(data);
            });
        });
    }
}

module.exports = FileHandler;
