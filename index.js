const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const errorPage = require("./views/404");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  keys: ["apwfjapwifj19u12rf"]
}))
app.use(express.static("./public"));

require('./routes/user/login')(app);
require("./routes/admin/users")(app);
require("./routes/user/logout")(app);
require("./routes/ticketz/tickets")(app);
//require("./routes/newRoutes")(app);

app.use((req, res) => {
  res.status(404).send(errorPage({ admin: req.session.userRole }));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);