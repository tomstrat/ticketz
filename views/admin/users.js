const layout = require("../layout");
const { getError } = require("../../utilities/getError");

module.exports = ({ users }) => {

  const renderedUsers = users.map(user => {
    return `
      <tr>
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td>
          <a href="/users/${user.username}/edit">
            <button>Edit</button>
          </a>
        </td>
        <td>
          <form method="POST" action="/users/${user.username}/delete">
            <input value="Delete" type="submit" onclick="return confirm('Are you sure?')" />
          </form>
        </td>
      </tr>
    `;
  }).join("");

  return layout(`
  <h3>Users</h3>
  <div>

  </div>
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Role</th>
        <th>Edit</th>
        <th>Delete</th>
      <tr>
    </thead>
    <tbody>
      ${renderedUsers}
    <tbody>
  </table>
  <a href="/users/new">New User</a>
`, "admin");
};