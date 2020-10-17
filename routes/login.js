const form = require('../views/login');
const layout = require('../views/layout');
const success = require("../views/success");

module.exports = (app, DB) => {
  app.get('/login', (req, res) => {
    res.send(layout(form('')));
  });

  app.post("/login", (req, res) => {

    const { username, password } = req.body;

    DB.getUser(username, (data) => {
      if (!data || password !== data.password) {
        return res.send(layout(form("Username or Password are incorrect!")));
      } else {
        req.session.userId = data.username;
        req.session.userRole = data.role;
        return res.send(layout(success(req.session.userId)));
      }
    });
  });
};
