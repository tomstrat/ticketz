const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors, cb, admin }) => {
  return layout(`
  <h3>Add Ticket</h3>
  <div>
    <form method="POST" action="/ticketz/new">
      <input type="text" name="title" placeholder="Title">
      ${getError(errors, "title")}
      <textarea name="desc" placeholder="Description" rows="5" cols="50"></textarea>
      ${getError(errors, "desc")}
      <input type="submit">
    </form>
  </div>
`, admin);
};