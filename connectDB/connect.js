const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/quiz_app',{useUnifiedTopology:true});
const db = mongoose.connection;
db.on('connected', console.error.bind(console,"connection error: "));
db.once("disconnected",function ( ){
    console.log("connected  succesfully");
})

module.exports =db;



