module.exports = function (id, cb) {
  const sql = `
    DELETE FROM Tickets
    WHERE id = ?
  `
  this.DB.run(sql, id, function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`Ticket Deleted!`);
      cb();
    }
  });
}