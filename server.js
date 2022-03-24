const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/data_model");
const cors = require("cors");
let PORT = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.post("/quizlist", async (req, res) => {
  await db.createTables(`${req.body.subject}`);
  const result = await db.createQuest(req.body, req.body.subject);
  res.status(201).json({ id: result[0] });
});

app.get("/quizlist", async (req, res) => {
  const python_quiz = await db.getAllQuests(req.body.subject);
  res.status(200).json(python_quiz);
});

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
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}....`);
});
