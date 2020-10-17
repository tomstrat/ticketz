module.exports = body => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>LP Ticketz</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <h1>LP Ticketz</h1>
    ${body}
  </body>
  </html>
`;
};
