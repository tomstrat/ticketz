const { validationResult } = require("express-validator");
const errorPage = require("../views/404");
const { User, Ticket } = require("../sequelize");
const user = require("../models/user");

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

        Ticket.findOne({ where: { id: req.params.id } })
          .then(ticket => {
            User.findOne({ where: { id: ticket.userId } })
              .then(user => {
                if (user.username !== req.session.userId) {
                  res.status(404).send(errorPage({ admin: req.session.userRole }));
                } else {
                  next();
                }
              });
          });

      } else {
        next();
      }
    }
  },
  checkTicketExists(DB) {
    return (req, res, next) => {

      Ticket.findOne({ where: { id: req.params.id } })
        .then(ticket => next())
        .catch(err => res.status(404).send(errorPage({ admin: req.session.userRole })));

    }
  },
  checkUserExists(DB) {
    return (req, res, next) => {

      User.findOne({ where: { username: req.params.username } })
        .then(user => next())
        .catch(err => res.status(404).send(errorPage({ admin: req.session.userRole })));

    }
  }

}