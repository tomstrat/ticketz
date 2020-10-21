const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ errors }) => {
  return layout(`
  <h3>Create Account</h3>
  <div>
    <form method="POST" action="/users/new">
      <input type="text" name="username" placeholder="Username">
      ${getError(errors, "username")}
      <input type="password" name="password" placeholder="Password">
      ${getError(errors, "password")}
      <input type="password" name="pwconfirmation" placeholder "Confirmation">
      ${getError(errors, "pwconfirmation")}
      <select name="role">
        <option value="user">User</option>
        <option value="reviewer">Reviewer</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit">
    </form>
  </div>
`);
};