exports.deleteUserById = function(db, res, id) {
    db.run("DELETE FROM users WHERE id = ?", id, function (err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('User deleted successfully');
        }
    });
}