const { check } = require('express-validator');
const addTicketForm = require('../../views/ticketz/addticket');
const ticketsPage = require("../../views/ticketz/tickets");
const singleTicketPage = require("../../views/ticketz/viewticket");
const { handleErrors, requireAuth, checkMyTicket, checkTicketExists } = require("../middlewares");
const validators = require("../validators");

module.exports = (app, DB) => {

  //DESTRUCTURE THIS HERE SO I CAN PASS DB IN
  const {
    requireTitle,
    requireDesc
  } = validators(DB)

  app.get("/ticketz", requireAuth(["admin", "reviewer", "user"]), (req, res) => {
    //SEND ALL TICKETZ OR JUST USERS
    if (req.session.userRole === "user") {
      DB.getUser(req.session.userId, (data) => {
        DB.getMyTickets(data.id, (tickets) => {
          res.send(ticketsPage({ tickets, admin: req.session.userRole }));
        });
      });
    } else {
      DB.getAllTickets((data) => {
        res.send(ticketsPage({ tickets: data, admin: req.session.userRole }))
      });
    }
  });

  app.get('/ticketz/new', requireAuth(["admin", "reviewer", "user"]), (req, res) => {
    res.send(addTicketForm({ admin: req.session.userRole }));
  });

  app.get(
    "/ticketz/:id",
    requireAuth(["admin", "reviewer", "user"]),
    checkMyTicket(DB),
    checkTicketExists(DB), (req, res) => {
      DB.getTicket(req.params.id, (data) => {
        res.send(singleTicketPage({ ticket: data, admin: req.session.userRole }));
      });
    });

  app.post("/ticketz/:id/delete", requireAuth(["admin"]), checkTicketExists(DB), (req, res) => {
    DB.deleteTicket(req.params.id, () => {
      res.redirect("/ticketz");
    });
  });

  app.post(
    "/ticketz/:id/resolve",
    requireAuth(["admin", "reviewer", "user"]),
    checkTicketExists(DB), (req, res) => {
      DB.updateTicket({ bool: 1, id: req.params.id }, () => {
        res.redirect("/ticketz");
      });
    });

  app.post(
    "/ticketz/:id/unresolve",
    requireAuth(["admin", "reviewer", "user"]),
    checkTicketExists(DB), (req, res) => {
      DB.updateTicket({ bool: 0, id: req.params.id }, () => {
        res.redirect("/ticketz");
      });
    });

  app.post(
    "/ticketz/new",
    [
      requireTitle,
      requireDesc
    ], handleErrors(addTicketForm), requireAuth(["admin", "reviewer", "user"]), (req, res) => {
      const { title, desc } = req.body;

      DB.getUser(req.session.userId, (data) => {
        DB.createTicket({ userID: data.id, title, desc });
      });
      res.redirect("/ticketz");
    });
};
