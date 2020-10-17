module.exports = function ({ bool, id, date }) {
  const sql = `
    UPDATE Tickets
    SET resolved = ?,
      resolve_date = ?
    WHERE id = ?
  `
  if (bool === 1) {
    this.DB.run(sql, [bool, date, id], function (err) {
      if (err) {
        console.log(err);
        return
      } else {
        console.log(`User Updated!`);
      }
    });
  } else if (bool === 0) {
    this.DB.run(sql, [bool, null, id], function (err) {
      if (err) {
        console.log(err);
        return
      } else {
        console.log(`User Updated!`);
      }
    });
  }

}