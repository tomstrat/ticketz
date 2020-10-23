const layout = require("../layout");

module.exports = ({ ticket, admin }) => {
  return layout(`
  <h3>${ticket.title}</h3>
  ${admin ? "<h4>" + ticket.username + "</h4>" : ""}
  <div>
    <p>${ticket.desc}</p>
    <p>Created:${ticket.publishDate}</p>
    <p>resolved: ${ticket.resolved}</p>
    ${ticket.resolved ? "<p>" + ticket.resolveDate + "</p>" : ""}
  </div>
`);
};