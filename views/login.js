const layout = require("./layout");
const { getError } = require("../utilities/getError");

module.exports = ({ errors }) => {
  return layout(`
  <h3>Login to Ticketz</h3>
  <div>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <input type="submit">
      ${getError(errors, "username") ? getError(errors, "username") : getError(errors, "password")}
    </form>
  </div>
`);
};