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

    await User.create(testUser)
    const ticket = await Ticket.create(testTicket)
    res.json(ticket);

  });

  app.get("/testUsers", (req, res) => {
    User.findAll().then(users => res.json(users));
  });


}