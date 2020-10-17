module.exports = (error) => {
  return `
  <h3>You are logged in to Ticketz</h3>
  <div>
    <p class="error">${error}</p>
  </div>
`;
};