const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = password => {

  return new Promise(async (resolve, reject) => {
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(password, salt, 64,);
    const hashed = `${buf.toString("hex")}.${salt}`;

    if (hashed) {
      resolve(hashed);
    } else {
      reject("Couldnt make new account");
    }
  });

}