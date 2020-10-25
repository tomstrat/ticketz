const moment = require("moment");

module.exports = function ({ userID, title, desc }) {
  const sql = `
    INSERT INTO Tickets (user_id, title, desc, resolved, publish_date, resolve_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const published = moment().format("DD/MM/YYYY");

  this.DB.run(sql, [userID, title, desc, 0, published, ""], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`Ticket Added! ID: ${this.lastID}, Row: ${this.changes}`);
    }
  });
}