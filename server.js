const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/data_model");
const cors = require("cors");
let PORT = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//! Post single data entry
app.post("/quizlist", async (req, res) => {
  await db.createTables(`${req.body.subject}`);
  const result = await db.createQuest(req.body, req.body.subject);
  res.status(201).json({ id: result[0] });
});

//!  Delete single data
app.delete("/quizlist", async (req, res) => {
  const result = await db.deleteSingleQuest(req.body.subject, req.body.id);
  res.json(result);
});

//!Get list  of a specific subject
app.get("/quizlist", async (req, res) => {
  const python_quiz = await db.getAllQuests(req.body.subject);
  res.status(200).json(python_quiz);
});

//! Delete table of subject
app.delete("/quizlist", async (req, res) => {
  const result = await db.deleteTable(req.body.subject);
  res.json(result);
});

//! Get all subjects json form
app.get("/allquiz", async (req, res) => {
  const allTables = await db.getAllTables();
  const list = [];
  const allQuiz = {};

  allTables.forEach((element) => list.push(element.subject));

  for (subject of list) {
    allQuiz[subject] = await db.getAllQuests(subject);
    allQuiz[subject].forEach((quest) => {
      quest.answers = [
        quest.answerOne,
        quest.answerTwo,
        quest.answerThree,
        quest.answerFour,
      ];
    });
  }
  res.json(allQuiz);
});

//! Post all subject quiz'z
app.post("/postall", async (req, res) => {
  let postedList = [];
  for (item of req.body) {
    await db.createTables(`${item.subject}`);
    const result = await db.createQuest(item, item.subject);
    postedList.push(result[0]);
  }
  res.status(201).json(postedList);
});
//! Post user
app.post("/user", async (req, res) => {
  await db.createUserTable("user");
  const result = await db.createUser(req.body);
  res.json(result);
});

//! Get all users
app.get("/user", async (req, res) => {
  await db.createUserTable("user");
  const result = await db.getAllUsers();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}....`);
});
