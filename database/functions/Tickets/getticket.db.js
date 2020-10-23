module.exports = function (id, cb) {

  const sql = `
    SELECT Tickets.id, username, title, desc, resolved, publish_date, resolve_date
    FROM Tickets
    INNER JOIN Users ON Users.id = Tickets.user_id
    WHERE Tickets.id = ?
  `
  this.DB.get(sql, id, function (err, row) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(row);
      cb({
        id: row.id,
        username: row.username,
        title: row.title,
        desc: row.desc,
        resolved: row.resolved,
        publishDate: row.publish_date,
        resolveDate: row.resolve_date
      });
    }
  });
}