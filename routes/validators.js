
const { check } = require("express-validator");
const comparePasswords = require("../utilities/comparepasswords");

module.exports = (DB) => {
  return {
    requireNewUsername: check("username")
      .trim()
      .escape()
      .custom(async username => {
        return await new Promise((resolve, reject) => {
          DB.getUser(username, (data) => {
            if (data) {
              reject("Username already exists!");
            }
            resolve();
          });
        });
      }),
    requireUsername: check("username")
      .trim()
      .escape()
      .custom(async username => {
        return await new Promise((resolve, reject) => {
          DB.getUser(username, (data) => {
            if (!data) {
              reject("Username or password incorrect");
            }
            resolve();
          });
        });
      }),
    requirePassword: check("password")
      .trim()
      .escape()
      .custom(async (password, { req }) => {
        return await new Promise((resolve, reject) => {
          DB.getUser(req.body.username, async (data) => {
            if (!data) {
              reject("Username or password incorrect");
            }
            const validPassword = await comparePasswords(password, data.password);
            if (!validPassword) {
              reject("Username or password incorrect");
            }
            resolve();
          })
        });
      }),
    requireNewPassword: check("password")
      .trim()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters"),
    requirePasswordConfirmation: check("pwconfirmation")
      .trim()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters")
      .custom((pwconfirmation, { req }) => {
        if (pwconfirmation !== req.body.password) {
          throw new Error("Passwords must match");
        } else {
          return true;
        }
      })
  }
}