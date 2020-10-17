module.exports = function ({ userID, title, desc, published }) {
  const sql = `
    INSERT INTO Users (user_id, title, desc, resolved, publish_date)
    VALUES (?, ?, ?, ?, ?)
  `
  this.DB.run(sql, [userID, title, desc, 0, published], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`Ticket Added! ID: ${this.lastID}, Row: ${this.changes}`);
    }
  });
}