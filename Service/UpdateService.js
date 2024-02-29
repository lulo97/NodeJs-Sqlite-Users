exports.updateUserById = function(db, res, id, updated_data) {
    db.run("UPDATE users SET name = ?, age = ? WHERE id = ?", [updated_data.name, updated_data.age, id], function (err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('User updated successfully');
        }
    });
}