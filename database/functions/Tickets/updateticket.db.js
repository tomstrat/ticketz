const moment = require("moment");

module.exports = function ({ bool, id }, cb) {
  const sql = `
    UPDATE Tickets
    SET resolved = ?,
      resolve_date = ?
    WHERE id = ?
  `
  const resolved = moment().format("DD MM YYYY");

  if (bool === 1) {
    this.DB.run(sql, [bool, resolved, id], function (err) {
      if (err) {
        console.log(err);
        return
      } else {
        console.log(`User Updated!`);
        cb();
      }
    });
  } else if (bool === 0) {
    this.DB.run(sql, [bool, "", id], function (err) {
      if (err) {
        console.log(err);
        return
      } else {
        console.log(`User Updated!`);
        cb();
      }
    });
  }

}