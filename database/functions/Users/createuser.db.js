module.exports = function ({ username, password, role }) {
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
    }
  });
}