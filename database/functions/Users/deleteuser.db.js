module.exports = function (username, cb) {
  const sql = `
    DELETE FROM Users
    WHERE username = ?
  `
  this.DB.run(sql, username, function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`User Deleted!`);
      cb();
    }
  });
}