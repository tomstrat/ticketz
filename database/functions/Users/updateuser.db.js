module.exports = function ({ field, data, id }) {
  const sql = `
    UPDATE Users
    SET ${field} = ?
    WHERE id = ?
  `
  this.DB.run(sql, [data, id], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`User Updated!`);
    }
  });
}