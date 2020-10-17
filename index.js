const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseAPI } = require("./database/database");
const dbMeta = require("./database/dbSchema");

const DB_PATH = "./database/sqlite.db";

const DB = new DatabaseAPI(DB_PATH, dbMeta.dbSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

const PORT = process.env.PORT || 3000;

const testUser = {
  username: "TomNew",
  password: "password",
  role: "admin"
}
const testUpdate = {
  field: "role",
  data: "user",
  id: 1
}

app.get("/", async (req, res) => {

  // await DB.updateUser(testUpdate);
  // DB.getUser(1, (data) => {
  //   res.send(data);
  // });
});


app.listen(PORT);