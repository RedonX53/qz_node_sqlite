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

module.exports = {
  createQuest,
  getAllQuests,
  tabeleRecord,
  getAllTables,
  createTables,
};
