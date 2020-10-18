

module.exports = {
  requireAuth(role) {
    return (req, res, next) => {
      if (req.session.userRole !== role) {
        res.redirect("/login");
      }

      next();
    }

  }
}