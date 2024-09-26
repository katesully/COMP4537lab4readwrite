const express = require('express');
const fs = require('fs');
const path = require('path');

class FileHandler {
    constructor(fileName) {
        this.filePath = path.join(__dirname, fileName);
    }

    // Method to append text to the file
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

    // Method to read content from the file
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

// Main class for the Express application
class App {
    constructor() {
        this.app = express();
        this.fileHandler = new FileHandler('file.txt'); // Specify the file name
        this.port = 4000;  
        this.setupRoutes();
    }

    setupRoutes() {
        // Route to append text to the file
        this.app.get('/COMP4537/labs/3/writeFile/', async (req, res) => {
            const text = req.query.text;

            if (!text) {
                return res.status(400).send('Bad Request: "text" query parameter is required');
            }

            try {
                const message = await this.fileHandler.appendToFile(text);
                res.send(message);
            } catch (error) {
                res.status(500).send(error);
            }
        });

        // Route to read the content of the file
        this.app.get('/COMP4537/labs/3/readFile/file.txt', async (req, res) => {
            try {
                const data = await this.fileHandler.readFromFile();
                res.send(`<pre>${data}</pre>`);  // Display file content in the browser
            } catch (error) {
                res.status(404).send(error);
            }
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

// Create an instance of the App class and start the server
const app = new App();
app.start();
