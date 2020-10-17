const form = require('../views/login');
const layout = require('../views/layout');
const success = require("../views/success");

module.exports = (app, DB) => {
  app.get('/logout', (req, res) => {
    req.session = null;
    res.send(layout(form('Signed Out')));
  });

};
