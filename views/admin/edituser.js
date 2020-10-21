const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors, data }) => {
  return layout(`
  <h3>Edit User</h3>
  <div>
    <form method="POST" action="/users/${data.username}/edit">
      <input type="text" name="username" value="${data.username}" placeholder="Username">
      ${getError(errors, "username")}
      <input type="password" name="password" placeholder="Password">
      ${getError(errors, "password")}
      <input type="password" name="pwconfirmation" placeholder "Confirmation">
      ${getError(errors, "pwconfirmation")}
      <select name="role">
        <option value="user" ${data.role == "user" ? "selected" : ""}>User</option>
        <option value="reviewer" ${data.role == "reviewer" ? "selected" : ""}>Reviewer</option>
        <option value="admin" ${data.role == "admin" ? "selected" : ""}>Admin</option>
      </select>
      <input type="submit">
    </form>
  </div>
`);
};