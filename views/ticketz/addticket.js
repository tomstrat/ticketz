const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors, cb, admin }) => {
  return layout(`
  <h3>Add Ticket</h3>
  <div class="viewMain">
    <form method="POST" action="/ticketz/new">
      <input class="titleInput" type="text" name="title" placeholder="Title">
      ${getError(errors, "title")}
      <textarea class="descInput" name="desc" placeholder="Description" rows="5" cols="50"></textarea>
      ${getError(errors, "desc")}
      <input class="button" type="submit">
    </form>
  </div>
`, admin);
};