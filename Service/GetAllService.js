exports.getAllUsers = function(db, res) {
    // Retrieve data from SQLite database
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }
    });
}