module.exports = (body, role) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>LP Ticketz</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css" />
  </head>
  <body>
    <nav>
      <ul>
        <li class="navTitle">LP Ticketz</li>
        ${role ? '<li><a href="/users">Users</a></li>' : ""}
        <li><a href="/ticketz">Ticketz</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
    <div class="main">
      ${body}
    </div>
  </body>
  </html>
`;
};
