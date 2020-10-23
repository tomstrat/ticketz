module.exports = function (userId, cb) {
  const sql = `
    SELECT id, title, desc, resolved, publish_date, resolve_date
    FROM Tickets
    WHERE user_id = ?
  `
  this.DB.all(sql, userId, function (err, rows) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(rows);
      cb(rows);
    }
  });
}