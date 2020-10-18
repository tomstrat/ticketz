const addUserForm = require('../../views/adduser');
const { handleErrors, requireAuth } = require("../middlewares");
const validators = require("../validators");


module.exports = (app, DB) => {

  //DESTRUCTURE THIS HERE SO I CAN PASS DB IN
  const { requireNewUsername, requireNewPassword, requirePasswordConfirmation } = validators(DB)

  app.get('/users/new', requireAuth("admin"), (req, res) => {
    res.send(addUserForm({}));
  });

  app.post(
    "/users/new",
    [
      requireNewUsername,
      requireNewPassword,
      requirePasswordConfirmation
    ], handleErrors(addUserForm), async (req, res) => {
      const { username, password, role } = req.body;


      DB.createUser({ username, password, role }, (id) => {
        return res.send(addUserForm());
      });

    });
};
