
const { check } = require("express-validator");
const comparePasswords = require("../utilities/comparepasswords");
const { User } = require("../sequelize");

module.exports = {
  requireUsername: check("username")
    .trim()
    .escape()
    .custom(async username => {
      return await new Promise((resolve, reject) => {
        User.findOne({ where: { username: username } })
          .then(user => {
            if (user) {
              resolve()
            } else {
              reject("Username or password incorrect");
            }
          })
          .catch(err => reject(err));
      });
    }),
  requireNewUsername: check("username")
    .trim()
    .escape()
    .custom(async username => {
      return await new Promise((resolve, reject) => {
        User.findOne({ where: { username: username } })
          .then(user => {
            if (user) {
              reject("Username already exists!")
            } else {
              resolve();
            }
          })
          .catch(err => reject(err));
      });
    }),
  requireEditUsername: check("username")
    .trim()
    .escape()
    .custom(async (username, { req }) => {
      //Check if username is own name
      if (req.params.username !== username) {
        if (req.params.username === req.session.userId) {
          throw new Error("Cant edit own username!");
        }
        const user = await User.findOne({ where: { username: username } });
        if (user) {
          throw new Error("Username already exists!");
        }
      }
    }),
  requirePassword: check("password")
    .trim()
    .escape()
    .custom(async (password, { req }) => {
      return await new Promise((resolve, reject) => {

        User.findOne({ where: { username: req.body.username } })
          .then(user => {
            if (!comparePasswords(password, user.password)) {
              reject("Username or password incorrect");
            } else {
              resolve();
            }
          })
          .catch(err => reject(err));

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
