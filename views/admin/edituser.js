const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors, data }) => {
  return layout(`
  <h3>Edit User</h3>
  <div class="viewMain">
    <form method="POST" action="/users/${data.username}/edit">
      <input class="addUserInput" type="text" name="username" value="${data.username}" placeholder="Username">
      ${getError(errors, "username")}
      <input class="addUserInput" type="password" name="password" placeholder="Password">
      ${getError(errors, "password")}
      <input class="addUserInput" type="password" name="pwconfirmation" placeholder="Confirmation">
      ${getError(errors, "pwconfirmation")}
      <select class="selectInput" name="role">
        <option value="user" ${data.role == "user" ? "selected" : ""}>User</option>
        <option value="reviewer" ${data.role == "reviewer" ? "selected" : ""}>Reviewer</option>
        <option value="admin" ${data.role == "admin" ? "selected" : ""}>Admin</option>
      </select>
      <input class="button" type="submit">
    </form>
  </div>
`, "admin");
};