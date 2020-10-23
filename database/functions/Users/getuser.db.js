module.exports = function (username, cb) {
  const sql = `
    SELECT id, username, role, password
    FROM Users
    WHERE username = ?
  `
  this.DB.get(sql, username, function (err, row) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(row);
      cb(row);
    }
  });
}