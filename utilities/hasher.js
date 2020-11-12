const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = async password => {

  const salt = crypto.randomBytes(8).toString("hex");
  const buf = await scrypt(password, salt, 64,);
  const hashed = `${buf.toString("hex")}.${salt}`;

  return hashed;

}