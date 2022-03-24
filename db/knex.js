const knex = require("knex");

const connectedDatabse = knex({
  client: "sqlite3",
  connection: {
    filename: "quiz_db.sqlite3",
  },
});

module.exports = connectedDatabse;
