const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const TicketModel = require("./models/ticket");

const url = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@kandula.db.elephantsql.com:5432/${process.env.DB_USER}`;

const sequelize = new Sequelize(url);

const User = UserModel(sequelize, Sequelize);
const Ticket = TicketModel(sequelize, Sequelize);

Ticket.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log("Database & tables created!");
  });

module.exports = {
  User,
  Ticket
}
