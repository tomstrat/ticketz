const layout = require("../layout");

module.exports = ({ tickets, admin }) => {
  console.log("role is: " + admin);

  const renderedTickets = tickets.map(ticket => {
    return `
      <tr>
        ${admin !== "user" ? "<td>" + ticket.username + "</td>" : ""}
        <td><a href="/ticketz/${ticket.id}"/>${ticket.title}</a></td>
        <td>${ticket.publish_date}</td>
        <td>${ticket.resolve_date}</td>
        <td>${ticket.resolved ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}</td>
      </tr>
    `;
  }).join("");

  return layout(`
  <h3>Tickets</h3>
  <div>

  </div>
  <table>
    <thead>
      <tr>
        ${admin !== "user" ? "<th>Username</th>" : ""}
        <th>Title</th>
        <th>Created</th>
        <th>Resolved</th>
        <th>Resolve</th>
      <tr>
    </thead>
    <tbody>
      ${renderedTickets}
    <tbody>
  </table>
  <a class="button" href="/ticketz/new">New Ticket</a>
`, admin);
};