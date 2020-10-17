const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = async function (supplied, saved) {

  const [hashed, salt] = saved.split(".");
  const buf = await scrypt(supplied, salt, 64);
  const hashedSupplied = buf.toString("hex");

  return hashed === hashedSupplied;

}