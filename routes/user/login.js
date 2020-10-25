const form = require('../../views/login');
const { handleErrors } = require("../middlewares");
const validators = require("../validators");

module.exports = (app, DB) => {

  //DESTRUCTURE THIS HERE SO I CAN PASS DB IN
  const { requireUsername, requirePassword } = validators(DB)

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

      DB.getUser(req.body.username, data => {
        req.session.userId = data.username;
        req.session.userRole = data.role;
        return res.redirect("/ticketz");
      });

    });
};
