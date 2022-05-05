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


  app.get('/dataUsers/:userID',(req, res) => {
    datausersModel.findOne({_id:req.params.userID})
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

// get quiz by titleID
  app.get('/quiz/:titleID',(req, res) => {
    quizzesModel.findOne({_id:req.params.titleID})
    .then((results) => {
        res.send(results);
    })
    .catch((error) =>{
        res.send(error);
    })
  })


// get quiz by titlID and questionID
app.get('/quiz/:titleID/:quesID',(req, res) => {
  quizzesModel.findOne({_id:req.params.titleID},{_id:req.params.quesID})
  .then((results) => {
      res.send(results);
  })
  .catch((error) =>{
      res.send(error);
  })
})

  // add data users to MongoDB 
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
app.post('/deleteQuestion/:titleID/:queID',(req, res) => {
  quizzesModel.updateOne({_id:req.params.titleID}, {$pull:{questions: {_id: req.params.queID}}})
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})

// add title
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
app.post('/updateQuestion/:titleID/:quesID/:question/:answer1/:answer2/:answer3/:answer4/:correctAnswer/:score',(req, res) => {
  quizzesModel.updateOne({_id: req.params.titleID,_id2: req.params.quesID},{$set:{questions:{question: req.params.question,answer:{answer1: req.params.answer1,answer2: req.params.answer2,answer3: req.params.answer3,answer4: req.params.answer4},correctAnswer: req.params.correctAnswer,score:req.params.score}}})
  .then((resulte) => {
      res.send(resulte);
  })
  .catch((error) => {
      res.send(error);
  })
})

