const layout = require("./layout");
const { getError } = require("../utilities/getError");

module.exports = ({ errors }) => {
  return layout(`
  <h3>Login to Ticketz</h3>
  <div class="viewMain">
    <form method="POST" action="/">
      <input class="addUserInput" type="text" name="username" placeholder="Username">
      <input class="addUserInput" type="password" name="password" placeholder="Password">
      <input class="button" type="submit">
      ${getError(errors, "username") ? getError(errors, "username") : getError(errors, "password")}
    </form>
  </div>
`);
};