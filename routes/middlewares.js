const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc, dataCb) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {

        let data = {};
        if (dataCb) {
          data = dataCb(req);
        }


        console.log(`Errors: ${errors}`);
        return res.send(templateFunc({ errors, data }));
      }

      next()
    };
  },

  requireAuth(roles) {
    return (req, res, next) => {

      let validRole = false;
      roles.forEach(role => {
        if (req.session.userRole === role) {
          validRole = true;
        }
      })
      if (!validRole) {
        res.redirect("/404");
      } else {
        next();
      }

    };

  },

  checkSelf(req, res, next) {
    if (req.session.userId === req.params.username) {
      res.redirect("/users");
    } else {
      next();
    }
  }
}