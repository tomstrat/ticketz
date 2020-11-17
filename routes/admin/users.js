const addUserForm = require('../../views/admin/adduser');
const usersPage = require("../../views/admin/users");
const editUsersForm = require("../../views/admin/edituser");
const { handleErrors, requireAuth, checkSelf, checkUserExists } = require("../middlewares");
const validators = require("../validators");
const { User, Ticket } = require("../../sequelize");
const hasher = require("../../utilities/hasher");
const user = require('../../models/user');
const {
  requireNewUsername,
  requireNewPassword,
  requirePasswordConfirmation,
  requireEditPassword,
  requireEditPasswordConfirmation,
  requireEditUsername
} = validators()


module.exports = (app) => {

  app.get("/users", requireAuth(["admin"]), (req, res) => {
    User.findAll().then(users => res.send(usersPage({ users })));
  });

  app.get('/users/new', requireAuth(["admin"]), (req, res) => {
    res.send(addUserForm({}));
  });

  app.get(
    "/users/:username/edit",
    requireAuth(["admin"]),
    checkSelf, checkUserExists(), (req, res) => {
      //CANT EDIT SELF

      User.findOne({ where: { username: req.params.username } })
        .then(data => res.send(editUsersForm({ errors: "", data })));

    });

  app.post(
    "/users/:username/edit",
    [
      requireEditUsername,
      requireEditPassword,
      requireEditPasswordConfirmation
    ],
    handleErrors(editUsersForm, req => {
      return { username: req.body.username, role: req.body.role }
    }),
    requireAuth(["admin"]), checkSelf,
    checkUserExists(), (req, res) => {

      //Check Username Change
      if (req.body.username !== req.params.username) {
        User.update({ username: req.body.username }, { where: { username: req.params.username } });
      }
      //Check Password Change
      if (req.body.password !== "") {
        const hashed = hasher(req.body.password);
        User.update({ password: hashed }, { where: { username: req.params.username } });
      }
      //Update Role
      User.update({ role: req.body.role }, { where: { username: req.params.username } });

      res.redirect("/users");

    });

  app.post(
    "/users/:username/delete",
    requireAuth(["admin"]),
    checkSelf, checkUserExists(), (req, res) => {
      //CANT DELETE SELF
      User.destroy({ where: { username: req.params.username } })
        .then(user => res.redirect("/users"));

    });

  app.post(
    "/users/new",
    [
      requireNewUsername,
      requireNewPassword,
      requirePasswordConfirmation
    ], handleErrors(addUserForm), requireAuth(["admin"]), (req, res) => {
      const { username, password, role } = req.body;

      User.create({ username, password, role })
        .then(user => res.redirect("/users"));

    });
};
