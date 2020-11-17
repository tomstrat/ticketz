const { User } = require('../../sequelize');
const form = require('../../views/login');
const { handleErrors } = require("../middlewares");
const { requireUsername, requirePassword } = require("../validators");

module.exports = (app) => {

  app.get('/', (req, res) => {
    if (req.session.userRole) {
      res.redirect("/ticketz");
    } else {
      res.send(form({}));
    }
  });

  app.post(
    "/",
    [
      requireUsername,
      requirePassword
    ], handleErrors(form), (req, res) => {

      User.findOne({ where: { username: req.body.username } })
        .then(data => {
          req.session.userId = data.username;
          req.session.userRole = data.role;
          return res.redirect("/ticketz");
        });

    });
};
