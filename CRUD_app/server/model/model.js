// For mongodb schema : Allows us to define shape & content of document

const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  //Spcifying shape of the document
  image : {
    // data: Buffer , 
    // contentType : String 
    type : String, 
    required : true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender:String,
  status:String,

  created : {
    type : Date,
    required : true,
    default : Date.now()
  }
});

// userdb : document Name
//schema : will specify the scheme of the provided document
const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;

//Once the model is created successfully , we will define the controller of the website
