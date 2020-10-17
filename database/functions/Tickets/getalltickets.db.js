module.exports = function (cb) {
  const sql = `
    SELECT user_id, title, desc, resolved, publish_date, resolve_date
    FROM Tickets
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