module.exports = (error) => {
  return `
  <h3>Create Account</h3>
  <div>
    <form method="POST" action="/users/new">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <input type="password" name="pwconfirmation" placeholder "Confirmation">
      <select name="role">
        <option value="user">User</option>
        <option value="reviewer">Reviewer</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit">
      <p class="error">${error}</p>
    </form>
  </div>
`;
};