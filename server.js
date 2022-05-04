const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors()); // To allow any origin
app.use(express.json()); // To read json data in request body
app.use(express.urlencoded())

app.listen(3000, () => {
  console.log("App run on http://localhost:3000");
});


// import Task model
const models = require("./model/model");
const datausersModel = models.datausersModel;
const quizzesModel = models.quizzesModel;
// require all file in public to use
app.use(express.static("public"));

app.get('/dataUsers/:password/:username',(req, res) => {
    datausersModel.findOne({password:req.params.password,username:req.params.username})
    .then((results) => {
      res.send(results);
    })
    .catch((error) =>{
        res.send(error);
    })
  })

  app.get('/quiz',(req, res) => {
    quizzesModel.find()
    .then((results) => {
        res.send(results);
    })
    .catch((error) =>{
        res.send(error);
    })
  })


  app.get('/quiz/:titleID',(req, res) => {
    quizzesModel.findOne({_id:req.params.titleID})
    .then((results) => {
        res.send(results);
    })
    .catch((error) =>{
        res.send(error);
    })
  })

  // add data to MongoDB 
app.post('/addUser',(req, res) => {
  datausersModel.create(req.body)
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})

app.post('/addQuestions/:id',(req, res) => {
  quizzesModel.updateOne({_id:req.params.id}, {$push:{questions: req.body}})
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})
// , {$pull:{questions: req.body}
app.post('/deleteQuestion/:titleID/:queID',(req, res) => {
  quizzesModel.updateOne({_id:req.params.titleID}, {$pull:{questions: {_id: req.params.queID}}})
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})

app.post('/title',(req, res) => {
  quizzesModel.create(req.body)
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})


// update
app.put('/updateQuestion/:titleID/:quesID',(req, res) => {
  quizzesModel.updateOne({_id: req.params.titleID},{$set:{questions:{question: req.body.question,answer:{answer1: req.body.answer.answer1,answer2: req.body.answer.answer2,answer3: req.body.answer.answer3,answer4: req.body.answer.answer4},correctAnswer: req.body.correctAnswer,score:req.body.score}}})
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})

