module.exports = function (id, cb) {
  const sql = `
    SELECT username, role
    FROM Users
    WHERE id = ?
  `
  this.DB.get(sql, id, function (err, row) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(row);
      cb({ username: row.username, role: row.role });
    }
  });
}