const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { DatabaseAPI } = require("./database/database");
const dbMeta = require("./database/dbSchema");
const errorPage = require("./views/404");

require("dotenv").config();

const DB_PATH = "./database/sqlite.db";

const DB = new DatabaseAPI(DB_PATH, dbMeta.dbSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  keys: ["apwfjapwifj19u12rf"]
}))
app.use(express.static("./public"));

require('./routes/user/login')(app, DB);
require("./routes/admin/users")(app, DB);
require("./routes/user/logout")(app, DB);
require("./routes/ticketz/tickets")(app, DB);

app.use((req, res) => {
  res.status(404).send(errorPage({ admin: req.session.userRole }));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);