const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { DatabaseAPI } = require("./database/database");
const dbMeta = require("./database/dbSchema");

const DB_PATH = "./database/sqlite.db";

const DB = new DatabaseAPI(DB_PATH, dbMeta.dbSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  keys: ["apwfjapwifj19u12rf"]
}))
app.use(express.static("./public"));

require('./routes/login')(app, DB);
require("./routes/users")(app, DB);
require("./routes/logout")(app, DB);

const PORT = process.env.PORT || 3000;

app.listen(PORT);