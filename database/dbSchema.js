module.exports.dbSchema = `
CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  role text NOT NULL
);
CREATE TABLE IF NOT EXISTS Tickets (
  id integer NOT NULL PRIMARY KEY,
  user_id integer NOT NULL,
  title text NOT NULL,
  desc text NOT NULL,
  resolved integer NOT NULL,
  publish_date date NOT NULL,
  resolve_date date NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
`;