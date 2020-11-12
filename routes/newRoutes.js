const { User, Ticket } = require("../sequelize");

module.exports = (app) => {

  app.get("/testUser", (req, res) => {

    const testUser = {
      username: "Tom",
      password: "password",
      role: "admin"
    }

    User.create(testUser)
      .then(user => res.json(user));

  });

  app.get("/testUsers", (req, res) => {
    User.findAll().then(users => res.json(users));
  });


}