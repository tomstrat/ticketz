const addTicketForm = require('../../views/ticketz/addticket');
const ticketsPage = require("../../views/ticketz/tickets");
const { handleErrors, requireAuth } = require("../middlewares");
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
          res.send(ticketsPage({ tickets, admin: false }));
        });
      });
    } else {
      DB.getAllTickets((data) => {
        res.send(ticketsPage({ tickets: data, admin: true }))
      });
    }
  });

  app.get('/ticketz/new', requireAuth(["admin", "reviewer", "user"]), (req, res) => {
    res.send(addTicketForm({}));
  });

  // app.get("/ticketz/:ticket/edit", requireAuth(["admin", "reviewer", "user"]), (req, res) => {
  //   // DB.getUser(req.params.username, (data) => {
  //   //   res.send(editUsersForm({ errors: "", data }));
  //   // });
  // });

  // app.post(
  //   "/ticketz/:ticket/edit",
  //   [

  //   ],
  //   handleErrors(editUsersForm, req => {
  //     return { username: req.body.username, role: req.body.role }
  //   }),
  //   requireAuth(["admin", "reviewer", "user"]), (req, res) => {

  //     // //Check Username Change
  //     // if (req.body.username !== req.params.username) {
  //     //   DB.updateUser({ field: "username", data: req.body.username, username: req.params.username });
  //     // }
  //     // //Check Password Change
  //     // if (req.body.password !== "") {
  //     //   DB.updateUser({ field: "password", data: req.body.password, username: req.body.username });
  //     // }
  //     // //Update Role
  //     // DB.updateUser({ field: "role", data: req.body.role, username: req.body.username });

  //     // res.redirect("/users");

  //   });


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
      res.send("/ticketz");
    });
};
