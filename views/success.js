const layout = require("./layout");

module.exports = (error) => {
  return layout(`
  <h3>You are logged in to Ticketz</h3>
  <div>
    <p class="error">${error}</p>
  </div>
`);
};