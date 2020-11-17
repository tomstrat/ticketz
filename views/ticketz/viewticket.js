const layout = require("../layout");

module.exports = ({ ticket, admin }) => {

  const deleteForm = `
    <form method="POST" action="/ticketz/${ticket.id}/delete">
      <input class="button" value="Delete" type="submit" onclick="return confirm('Are you sure?')" />
    </form> 
  `;
  const resolveForm = `
    <form method="POST" action="/ticketz/${ticket.id}/resolve">
      <input class="button" value="Resolve" type="submit" onclick="return confirm('Are you sure?')" />
    </form>
  `;
  const unresolveForm = `
    <form method="POST" action="/ticketz/${ticket.id}/unresolve">
      <input class="button" value="Unresolve" type="submit" onclick="return confirm('Are you sure?')" />
    </form>
  `


  return layout(`
  <h3>View Ticket</h3>
  <div class="viewMain">
    ${admin !== "user" ? "<h4>" + ticket.username + "</h4>" : ""}
    <p class="title"><strong>Title:</strong> ${ticket.title}</p>
    <p class="desc"><strong>Description:</strong><br /> ${ticket.desc}</p>
    <p><strong>Created:</strong>${ticket.publishedDate}</p>
    <p><strong>resolved:</strong> ${ticket.resolved ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}</p>
    ${ticket.resolved ? "<p>" + ticket.resolvedDate + "</p>" : ""}
    ${admin === "admin" ? deleteForm : ""}
    ${admin !== "user" && ticket.resolved ? unresolveForm : ""}
    ${admin !== "user" && !ticket.resolved ? resolveForm : ""}
  </div>

`, admin);
};