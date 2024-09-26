//LLMs were used in the creation of this code

const express = require('express');
const FileHandler = require('./FileHandler');

class Routes {
    constructor(fileHandler) {
        this.router = express.Router();
        this.fileHandler = fileHandler;
        this.setupRoutes();
    }

    setupRoutes() {
        // Route to append text to the file
        this.router.get('/COMP4537/labs/3/writeFile/', async (req, res) => {
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
        this.router.get('/COMP4537/labs/3/readFile/file.txt', async (req, res) => {
            try {
                const data = await this.fileHandler.readFromFile();
                res.send(`<pre>${data}</pre>`);  // Display file content in the browser
            } catch (error) {
                res.status(404).send(error);
            }
        });
    }
}

module.exports = Routes;
