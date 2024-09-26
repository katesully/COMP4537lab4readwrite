//LLMs were used in the creation of this code

const FileHandler = require('./modules/FileHandler');
const Routes = require('./modules/Routes');
const Server = require('./modules/Server');

const fileHandler = new FileHandler('file.txt'); // Create a FileHandler instance
const routes = new Routes(fileHandler); // Create a Routes instance
const server = new Server(routes); // Create a Server instance

server.start(); // Start the server
