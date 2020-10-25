const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors }) => {
  return layout(`
  <h3>Create Account</h3>
  <div class="viewMain">
    <form method="POST" action="/users/new">
      <input class="addUserInput" type="text" name="username" placeholder="Username">
      ${getError(errors, "username")}
      <input class="addUserInput" type="password" name="password" placeholder="Password">
      ${getError(errors, "password")}
      <input class="addUserInput" type="password" name="pwconfirmation" placeholder="Confirmation">
      ${getError(errors, "pwconfirmation")}
      <select class="selectInput" name="role">
        <option value="user">User</option>
        <option value="reviewer">Reviewer</option>
        <option value="admin">Admin</option>
      </select>
      <input class="button" type="submit">
    </form>
  </div>
`, "admin");
};