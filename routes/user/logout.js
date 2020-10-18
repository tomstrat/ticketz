
module.exports = (app, DB) => {
  app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

};
