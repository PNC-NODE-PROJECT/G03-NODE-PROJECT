const mongoose = require("mongoose");

// TODO: Connect to MangoDB
mongoose.connect('mongodb://127.0.0.1:27017/quiz_app',{useUnifiedTopology:true});

// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// TODO:  Define the Schema for the Tasks collection
// Schema 
const schema = new mongoose.Schema({
  // required it mean it this fill must have some text
  username:{
        type:"string",
        required:true
    },
    password:{
        type:"string",
        required:true  
    },
    email:{
      type:"string",
       required:true
      },
      gender:{
        type:"string",
        required:true
      },
      birthdayDate:{
        type:"string",
        required:false
      }
})

// schema for queestion
const schemaQuestions = new mongoose.Schema({
    userID:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"datausers"
    },
    title:{
      type:"string",
    },
    questions:[{
      question:{
        type:"string",
      },
      answer:{
        answer1:{
          type:"string",
        },
        answer2:{
          type:"string",
        },
        answer3:{
          type:"string",
        },
        answer4:{
          type:"string",
        },
      },
      correctAnswer:{
        type:"string",
      },
      score:{
        type:"number",
      }
    }]

})

// Create the Model for the Tasks collection from Schema
const MyModel = mongoose.model("datausers",schema);

// Create the Model for the Tasks collection from Schema
const MyModelQuestion = mongoose.model("quizzes",schemaQuestions);

module.exports.datausersModel = MyModel;
module.exports.quizzesModel = MyModelQuestion;
