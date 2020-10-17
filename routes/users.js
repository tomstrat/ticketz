const adduser = require('../views/adduser');
const addUserForm = require('../views/adduser');
const layout = require('../views/layout');


module.exports = (app, DB) => {
  app.get('/users/new', (req, res) => {
    res.send(layout(addUserForm('')));
  });

  app.post("/users/new", async (req, res) => {
    const { username, password, pwconfirmation, role } = req.body;

    //Check user exists
    await DB.getUser(username, (data) => {
      if (data) {
        return res.send(layout(addUserForm("Username Already Exsists!")));
      }
    });
    //Check passwords match
    if (password !== pwconfirmation) {
      return res.send(layout(addUserForm("Passwords Must Match")));
    }

    DB.createUser({ username, password, role }, (id) => {
      return res.send(layout(addUserForm("Account Created Successfully")));
    });

  });
};