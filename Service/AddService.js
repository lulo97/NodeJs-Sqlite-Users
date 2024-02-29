exports.addUser = function(db, res, userData) {
    const { name, age } = userData;

    if (!name || !age) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Name and age are required fields');
        return;
    }

    db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age], function(err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('User added successfully');
        }
    });
}