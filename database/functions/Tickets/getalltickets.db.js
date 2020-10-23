module.exports = function (cb) {
  const sql = `
    SELECT Tickets.id, username, title, desc, resolved, publish_date, resolve_date
    FROM Tickets
    INNER JOIN Users on Users.id = Tickets.user_id
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