
const { check } = require("express-validator");
const comparePasswords = require("../utilities/comparepasswords");

module.exports = (DB) => {
  return {
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
    requireEditUsername: check("username")
      .trim()
      .escape()
      .custom(async (username, { req }) => {
        //Check if username is own name
        if (req.session.userId !== username) {
          return await new Promise((resolve, reject) => {
            DB.getUser(username, (data) => {
              if (data) {
                reject("Username already exists!");
              }
            });
            resolve();
          });
        }
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
      }),
    requireEditPassword: check("password")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters"),
    requireEditPasswordConfirmation: check("pwconfirmation")
      .trim()
      .escape()
      .custom((pwconfirmation, { req }) => {
        if (pwconfirmation !== req.body.password) {
          throw new Error("Passwords must match");
        } else {
          return true;
        }
      }),
    requireTitle: check("title")
      .trim()
      .escape()
      .isLength({ min: 4, max: 40 })
      .withMessage("Must be between 4 and 40 characters"),
    requireDesc: check("desc")
      .trim()
      .escape()
      .isLength({ min: 1, max: 500 })
      .withMessage("Must be between 4 and 40 characters")
  }
}