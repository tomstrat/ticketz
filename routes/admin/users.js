const addUserForm = require('../../views/admin/adduser');
const usersPage = require("../../views/admin/users");
const editUsersForm = require("../../views/admin/edituser");
const { handleErrors, requireAuth, checkSelf } = require("../middlewares");
const validators = require("../validators");



module.exports = (app, DB) => {

  //DESTRUCTURE THIS HERE SO I CAN PASS DB IN
  const {
    requireNewUsername,
    requireNewPassword,
    requirePasswordConfirmation,
    requireEditPassword,
    requireEditPasswordConfirmation,
    requireEditUsername
  } = validators(DB)

  app.get("/users", requireAuth(["admin"]), (req, res) => {
    DB.getAllUsers((data) => {
      res.send(usersPage({ users: data }))
    });
  });

  app.get('/users/new', requireAuth(["admin"]), (req, res) => {
    res.send(addUserForm({}));
  });

  app.get("/users/:username/edit", requireAuth(["admin"]), checkSelf, (req, res) => {
    //CANT EDIT SELF

    DB.getUser(req.params.username, (data) => {
      res.send(editUsersForm({ errors: "", data }));
    });

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
    requireAuth(["admin"]), checkSelf, (req, res) => {

      //Check Username Change
      if (req.body.username !== req.params.username) {
        DB.updateUser({ field: "username", data: req.body.username, username: req.params.username });
      }
      //Check Password Change
      if (req.body.password !== "") {
        DB.updateUser({ field: "password", data: req.body.password, username: req.body.username });
      }
      //Update Role
      DB.updateUser({ field: "role", data: req.body.role, username: req.body.username });

      res.redirect("/users");

    });

  app.post("/users/:username/delete", requireAuth(["admin"]), checkSelf, (req, res) => {
    //CANT DELETE SELF

    DB.deleteUser(req.params.username, () => {
      res.redirect("/users");
    });

  });

  app.post(
    "/users/new",
    [
      requireNewUsername,
      requireNewPassword,
      requirePasswordConfirmation
    ], handleErrors(addUserForm), requireAuth(["admin"]), (req, res) => {
      const { username, password, role } = req.body;


      DB.createUser({ username, password, role }, (id) => {
        res.redirect("/users");
      });

    });
};
