module.exports = (error) => {
  return `
  <h3>Login to Ticketz</h3>
  <div>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <input type="submit">
      <p class="error">${error}</p>
    </form>
  </div>
`;
};