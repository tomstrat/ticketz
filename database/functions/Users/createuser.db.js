const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = async function ({ username, password, role }, cb) {
  const sql = `
    INSERT INTO Users (username, password, role)
    VALUES (?, ?, ?)
  `
  const salt = crypto.randomBytes(8).toString("hex");
  const buf = await scrypt(password, salt, 64,);
  const hashed = `${buf.toString("hex")}.${salt}`;

  this.DB.run(sql, [username, hashed, role], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`User Added! ID: ${this.lastID}, Row: ${this.changes}`);
      cb(this.lastID);
    }
  });
}