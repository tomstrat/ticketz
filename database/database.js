const sqlite3 = require("sqlite3").verbose();

class DatabaseAPI {

  constructor(DB_PATH, dbSchema) {

    this.DB = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Connected to ${DB_PATH} database.`);

      this.DB.exec('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
          console.error("Pragma statement didn't work.");
        } else {
          console.log('Foreign Key Enforcement is on');
        }
      });
    });

    this.DB.exec(dbSchema, (err) => {
      if (err) {
        console.log(err);
      }
    });

  }
}

//USER FUNCTIONS
DatabaseAPI.prototype.createUser = require("./functions/Users/createuser.db");
DatabaseAPI.prototype.getUser = require("./functions/Users/getuser.db");
DatabaseAPI.prototype.getAllUsers = require("./functions/Users/getallusers.db");
DatabaseAPI.prototype.updateUser = require("./functions/Users/updateuser.db");
DatabaseAPI.prototype.deleteUser = require("./functions/Users/deleteuser.db");
//TICKET FUNCTIONS
DatabaseAPI.prototype.createTicket = require("./functions/Tickets/createticket.db");
DatabaseAPI.prototype.getTicket = require("./functions/Tickets/getticket.db");
DatabaseAPI.prototype.getAllTickets = require("./functions/Tickets/getalltickets.db");
DatabaseAPI.prototype.getMyTickets = require("./functions/Tickets/getmytickets.db");
DatabaseAPI.prototype.deleteTicket = require("./functions/Tickets/deleteticket.db");
//Only for updating resolution
DatabaseAPI.prototype.updateTicket = require("./functions/Tickets/updateticket.db");


module.exports = { DatabaseAPI };
