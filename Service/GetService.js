exports.getUserById = function(db, res, id) {
    db.get("SELECT * FROM users WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else if (!row) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(row));
        }
    });
}