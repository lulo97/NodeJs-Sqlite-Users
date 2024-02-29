const { getAllUsers } = require('../Service/GetAllService.js');
const { getUserById } = require('../Service/GetService.js');
const { addUser } = require('../Service/AddService.js');
const { updateUserById } = require('../Service/UpdateService.js');
const { deleteUserById } = require('../Service/DeleteService.js');

exports.handleGetAllUsers = function(req, res, db) {
    getAllUsers(db, res);
}

exports.handleAddUser = function(req, res, db) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const userData = JSON.parse(body);
        addUser(db, res, userData);
    });
}

exports.handleGetUserById = function(req, res, db) {
    const userId = req.url.split('/')[2];
    getUserById(db, res, userId);
}

exports.handleUpdateUserById = function(req, res, db) {
    const userId = req.url.split('/')[2];
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newData = JSON.parse(body);
        updateUserById(db, res, userId, newData);
    });
}

exports.handleDeleteUserById = function(req, res, db) {
    const userId = req.url.split('/')[2];
    deleteUserById(db, res, userId);
}

exports.handleNotFound = function(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}