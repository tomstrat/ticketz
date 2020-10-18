const { check } = require("express-validator");

module.exports = (DB) => {
  return {
    requireUsername: check("username")
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
    requirePassword: check("password")
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