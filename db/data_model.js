const knex = require("./knex");

async function tabeleRecord(collectionName) {
  await knex.schema.hasTable("record").then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable("record", async (table) => {
        table.increments("id");
        table.string("subject");
        await knex("record").insert({ subject: `${collectionName}` });
        console.log(`Table record created.....`);
      });
    } else {
      console.log(`Table record already exists.....`);
      await knex("record").insert({ subject: `${collectionName}` });
    }
  });
}

async function createTables(collectionName) {
  await knex.schema.hasTable(`${collectionName}`).then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable(`${collectionName}`, (table) => {
        table.increments("id");
        table.string("question");
        table.string("answerOne");
        table.string("answerTwo");
        table.string("answerThree");
        table.string("answerFour");
        table.string("correctAnswer");
        table.string("subject");
        console.log(`Table ${collectionName} created.....`);
      });
    } else {
      console.log(`Table ${collectionName} already exists.....`);
    }
  });
}

async function createUserTable(collectionName) {
  await knex.schema.hasTable(`${collectionName}`).then(async (exists) => {
    if (!exists) {
      return await knex.schema.createTable(`${collectionName}`, (table) => {
        table.increments("id");
        table.string("username");
        table.string("email");
        table.string("contact");
        table.string("result");
        console.log(`Table ${collectionName} created.....`);
      });
    } else {
      console.log(`Table ${collectionName} already exists.....`);
    }
  });
}

function createUser(user) {
  return knex("user").insert(user);
}

function getAllUsers() {
  return knex("user").select("*");
}

function createQuest(quest, collectionName) {
  tabeleRecord(collectionName);
  return knex(`${collectionName}`).insert(quest);
}

function getAllQuests(collectionName) {
  tabeleRecord(collectionName);
  return knex(`${collectionName}`).select("*");
}

function getAllTables() {
  return knex("record").select("subject").distinct();
}

function deleteTable(subject) {
  return knex(`${subject}`).del();
}

function deleteSingleQuest(subject, id) {
  return knex(subject).where("id", id).del();
}

function deleteAllUsers() {
  return knex("user").del();
}

function deleteSingleUser(id) {
  return knex("user").where("id", id).del();
}
module.exports = {
  createQuest,
  getAllQuests,
  deleteTable,
  tabeleRecord,
  deleteSingleQuest,
  getAllTables,
  createUserTable,
  createUser,
  getAllUsers,
  createTables,
  deleteSingleUser,
  deleteAllUsers,
};
