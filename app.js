const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const {
    handleAddUser, 
    handleDeleteUserById, 
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById,
    handleNotFound
} = require("./UsersAPI/handle.js")

const PORT = process.env.PORT || 3000;

// Create SQLite database connection
const db = new sqlite3.Database('./my_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create table if not exists
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)");
});

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        handleGetAllUsers(req, res, db);
    } else if (req.url === '/users' && req.method === 'POST') {
        handleAddUser(req, res, db);
    } else if (req.url.startsWith('/users/') && req.method === 'GET') {
        handleGetUserById(req, res, db);
    } else if (req.url.startsWith('/users/') && req.method === 'PUT') {
        handleUpdateUserById(req, res, db);
    } else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        handleDeleteUserById(req, res, db);
    } else {
        handleNotFound(req, res);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
