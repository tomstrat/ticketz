module.exports = function (id, cb) {
  const sql = `
    SELECT user_id, title, desc, resolved, publish_date, resolve_date
    FROM Tickets
    WHERE id = ?
  `
  this.DB.get(sql, id, function (err, row) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(row);
      cb({
        userID: row.userid,
        title: row.title,
        desc: row.desc,
        resolved: row.resolved,
        publishDate: row.publishdate,
        resolveDate: row.resolvedate
      });
    }
  });
}