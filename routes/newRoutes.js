const { User, Ticket } = require("../sequelize");
const hasher = require("../utilities/hasher");

module.exports = (app) => {

  app.get("/testUser", async (req, res) => {

    const pw = await hasher("password");
    const testUser = {
      username: "Tom",
      password: pw,
      role: "admin"
    }
    const testTicket = {
      title: "Test Ticket",
      desc: "This is a Desc",
      publishedDate: "12/11/2020",
      userId: 1
    }

    User.create(testUser)
      .then(user => {
        Ticket.create(testTicket)
          .then(ticket => res.json(ticket))
      });

  });

  app.get("/testUsers", (req, res) => {
    User.findAll().then(users => res.json(users));
  });


}