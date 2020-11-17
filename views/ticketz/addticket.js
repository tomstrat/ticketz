const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors, cb, admin }) => {
  return layout(`
  <h3>Add Ticket</h3>
  <div class="viewMain">
    <form method="POST" action="/ticketz/new">
      <input class="titleInput" type="text" name="title" placeholder="Title">
      <span class="error">${getError(errors, "title")}</span>
      <textarea class="descInput" name="desc" placeholder="Description" rows="5" cols="50"></textarea>
      <span class="error">${getError(errors, "desc")}</span>
      <input class="button" type="submit">
    </form>
  </div>
`, admin);
};