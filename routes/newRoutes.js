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

    User.create(testUser)
      .then(user => res.json(user));

  });

  app.get("/testUsers", (req, res) => {
    User.findAll().then(users => res.json(users));
  });


}