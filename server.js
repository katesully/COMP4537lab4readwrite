//LLMs were used in the creation of this code 
const express = require('express');

class Server {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.routes = routes;
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.use(this.routes.router);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
            console.log(this.routes.router);
        });
    }
}

module.exports = Server;
