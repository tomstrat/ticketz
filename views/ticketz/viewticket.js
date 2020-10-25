const layout = require("../layout");

module.exports = ({ ticket, admin }) => {

  const deleteForm = `
    <form method="POST" action="/ticketz/${ticket.id}/delete">
      <input value="Delete" type="submit" onclick="return confirm('Are you sure?')" />
    </form> 
  `;
  const resolveForm = `
    <form method="POST" action="/ticketz/${ticket.id}/resolve">
      <input value="Resolve" type="submit" onclick="return confirm('Are you sure?')" />
    </form>
  `;
  const unresolveForm = `
    <form method="POST" action="/ticketz/${ticket.id}/unresolve">
      <input value="Unresolve" type="submit" onclick="return confirm('Are you sure?')" />
    </form>
  `


  return layout(`
  <h3>${ticket.title}</h3>
  ${admin ? "<h4>" + ticket.username + "</h4>" : ""}
  <div>
    <p>${ticket.desc}</p>
    <p>Created:${ticket.publishDate}</p>
    <p>resolved: ${ticket.resolved}</p>
    ${ticket.resolved ? "<p>" + ticket.resolveDate + "</p>" : ""}
  </div>
  ${admin ? deleteForm : ""}
  ${admin && ticket.resolved ? unresolveForm : ""}
  ${admin && !ticket.resolved ? resolveForm : ""}
`, admin);
};