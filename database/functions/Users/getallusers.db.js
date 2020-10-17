module.exports = function (cb) {
  const sql = `
    SELECT username, role
    FROM Users
  `
  this.DB.all(sql, [], function (err, rows) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(rows);
      cb(rows);
    }
  });
}