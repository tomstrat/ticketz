const layout = require("../layout");

module.exports = ({ tickets }) => {

  const renderedTickets = tickets.map(ticket => {
    return `
      <tr>
        <td>${ticket.username}</td>
        <td><a href="/ticketz/${ticket.id}"/>${ticket.title}</a></td>
        <td>${ticket.publishDate}</td>
        <td>${ticket.resolved}</td>
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
        <th>Username</th>
        <th>Title</th>
        <th>Created</th>
        <th>Resolved</th>
      <tr>
    </thead>
    <tbody>
      ${renderedTickets}
    <tbody>
  </table>
`);
};