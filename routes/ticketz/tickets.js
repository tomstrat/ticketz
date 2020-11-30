const addTicketForm = require('../../views/ticketz/addticket');
const ticketsPage = require("../../views/ticketz/tickets");
const singleTicketPage = require("../../views/ticketz/viewticket");
const { handleErrors, requireAuth, checkMyTicket, checkTicketExists } = require("../middlewares");
const { User, Ticket } = require("../../sequelize");
const moment = require("moment");
const {
  requireTitle,
  requireDesc
} = require("../validators");

module.exports = (app) => {


  app.get("/ticketz", requireAuth(["admin", "reviewer", "user"]), async (req, res) => {
    //SEND ALL TICKETZ OR JUST USERS
    if (req.session.userRole === "user") {

      User.findOne({ where: { username: req.session.userId } })
        .then(user => {
          Ticket.findAll({ where: { userId: user.id } })
            .then(tickets => {
              ticketsPage({ tickets, admin: req.session.userRole });
            });
        });

    } else {

      const users = await User.findAll();
      const tickets = await Ticket.findAll();
      const ticketsWithUsers = tickets.map(ticket => {
        for (const user of users) {
          if (user.id === ticket.userId) {
            ticket.username = user.username;
          }
        }
        return ticket;
      });

      res.send(ticketsPage({ tickets: ticketsWithUsers, admin: req.session.userRole }));

    }
  });

  app.get('/ticketz/new', requireAuth(["admin", "reviewer", "user"]), (req, res) => {
    res.send(addTicketForm({ admin: req.session.userRole }));
  });

  app.get(
    "/ticketz/:id",
    requireAuth(["admin", "reviewer", "user"]),
    checkMyTicket(),
    checkTicketExists(), (req, res) => {
      Ticket.findOne({ where: { id: req.params.id } })
        .then(ticket => {
          User.findOne({ where: { id: ticket.userId } })
            .then(user => {
              ticket.username = user.username;
              res.send(singleTicketPage({ ticket, admin: req.session.userRole }));
            });
        });
    });

  app.post("/ticketz/:id/delete", requireAuth(["admin"]), checkTicketExists(), (req, res) => {
    Ticket.destroy({ where: { id: req.params.id } })
      .then(ticket => res.redirect("/ticketz"));
  });

  app.post(
    "/ticketz/:id/resolve",
    requireAuth(["admin", "reviewer", "user"]),
    checkTicketExists(), (req, res) => {
      Ticket.update({ resolved: 1 }, { where: { id: req.params.id } })
        .then(ticket => res.redirect("/ticketz"));
    });

  app.post(
    "/ticketz/:id/unresolve",
    requireAuth(["admin", "reviewer", "user"]),
    checkTicketExists(), (req, res) => {
      Ticket.update({ resolved: 0 }, { where: { id: req.params.id } })
        .then(ticket => res.redirect("/ticketz"));
    });

  app.post(
    "/ticketz/new",
    [
      requireTitle,
      requireDesc
    ], handleErrors(addTicketForm), requireAuth(["admin", "reviewer", "user"]), (req, res) => {
      const { title, desc } = req.body;

      const publishedDate = moment().format("DD/MM/YYYY");
      User.findOne({ where: { username: req.session.userId } })
        .then(user => {
          Ticket.create({ userId: user.id, title, desc, publishedDate })
            .then(ticket => res.redirect("/ticketz"));
        });
    });
};
