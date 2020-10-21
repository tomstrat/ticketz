const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = async function ({ field, data, username }) {
  const sql = `
    UPDATE Users
    SET ${field} = ?
    WHERE username = ?
  `;


  if (field === "password") {
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(data, salt, 64,);
    const hashed = `${buf.toString("hex")}.${salt}`;

    data = hashed;
  }

  this.DB.run(sql, [data, username], function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(`${field} Updated`);
    }
  });
}