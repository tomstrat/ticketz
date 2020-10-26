const layout = require("./layout");

module.exports = ({ admin }) => {
  return layout(`
  <h3>Page Not Found</h3>
  <div class="viewMain">
    <div class="fof">404</div>
    <div class="pnf">Page Not Found</div>
    <a style="text-align:center; text-decoration:none; display:block;" href="/">Return</a>
  </div>
`, admin);
};