const { validationResult } = require("express-validator");
const errorPage = require("../views/404");

module.exports = {
  handleErrors(templateFunc, dataCb) {
    return (req, res, next) => {
      const errors = validationResult(req);
      const admin = req.session.userRole;

      if (!errors.isEmpty()) {

        let data = {};
        if (dataCb) {
          data = dataCb(req);
        }


        console.log(`Errors: ${errors}`);
        return res.send(templateFunc({ errors, data, admin }));
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
        res.redirect("/");
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
  },

  checkMyTicket(DB) {
    return (req, res, next) => {
      if (req.session.userRole === "user") {
        DB.getTicket(req.params.id, (data) => {
          if (data.username !== req.session.userId) {
            res.status(404).send(errorPage({ admin: req.session.userRole }));
          } else {
            next();
          }
        })
      } else {
        next();
      }
    }
  },
  checkTicketExists(DB) {
    return (req, res, next) => {
      DB.getTicket(req.params.id, (data) => {
        if (!data) {
          res.status(404).send(errorPage({ admin: req.session.userRole }));
        } else {
          next();
        }
      });
    }
  },
  checkUserExists(DB) {
    return (req, res, next) => {
      DB.getUser(req.params.username, (data) => {
        if (!data) {
          res.status(404).send(errorPage({ admin: req.session.userRole }));
        } else {
          next();
        }
      });
    }
  }

}