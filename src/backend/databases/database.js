const express =  require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tvastra_users_info", {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("connection Successfull...");
}).catch(()=>{
    console.log(err);
});

const user_detailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    mobile_number: String,
    dob: String,
    address:{city: String,
             state: String,
             country: String
            }
});

const User_info = new mongoose.model("User_info",user_detailsSchema);

module.exports = {
    User_info : User_info}
