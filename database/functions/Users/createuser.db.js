module.exports = function ({ username, password, role }, cb) {
  const sql = `
    INSERT INTO Users (username, password, role)
    VALUES (?, ?, ?)
  `
  this.DB.run(sql, [username, password, role], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`User Added! ID: ${this.lastID}, Row: ${this.changes}`);
      cb(this.lastID);
    }
  });
}