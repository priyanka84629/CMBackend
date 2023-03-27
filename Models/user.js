const mongoose=require('mongoose')

const userSchema =new mongoose.Schema({
    email: {type: String, unique:true}, 
    password: String
  },{timestamps:true});
  const users = mongoose.model("users", userSchema, "users");

  module.exports= users