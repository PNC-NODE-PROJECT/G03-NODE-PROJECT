
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