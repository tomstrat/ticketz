module.exports = (body, role) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>LP Ticketz</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css" />
    <script src="https://kit.fontawesome.com/b938075315.js" crossorigin="anonymous"></script>
  </head>
  <body>
    <nav>
      <ul>
        <li class="navTitle">LP Ticketz</li>
        ${role === "admin" ? '<li><a href="/users">Users</a></li>' : ""}
        ${role ? '<li><a href="/ticketz">Ticketz</a></li>' : ""}
        ${role ? '<li><a href="/logout">Logout</a></li>' : ""}
      </ul>
    </nav>
    <div class="main">
      ${body}
    </div>
  </body>
  </html>
`;
};
