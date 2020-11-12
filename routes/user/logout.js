
module.exports = (app) => {
  app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect("/");
  });

};
