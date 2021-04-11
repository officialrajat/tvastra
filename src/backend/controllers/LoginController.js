const express  = require("express");
const { render } = require("../../app.js");
const app  = express();
const db = require("../databases/database.js");
const Vonage = require('@vonage/server-sdk');
const vonage_api_key = "309c5528";
const vonage_api_secret = "KEftcD6HfVV2zApr";
const vonage_brand_name = "tecnohub";
let verifyRequestId = null;
let verifyRequestNumber = null; 
const vonage = new Vonage(
    {
      apiKey:  vonage_api_key,
          apiSecret:  vonage_api_secret,
      },
      {
          debug: true,
      }
  );






function get_login(req,res){console.log("log in into the new era");
    res.render("login_page");
}
function get_signup(req,res){console.log("signup for new era");
    res.render("signup_page");
}
function get_otp_login(req, res) {
    console.log("login with otp");
    res.render("otp_login_page");
}
function get_verifying_otp(req,res){
    console.log("otp verification page starts ");
    res.render("verifying-otp");
}
function get_forget_password(req, res){
    console.log("forget_password page starts");
    res.render("forget_password");
}

function post_signup(req,res){
  console.log(req.body);
   const user = new db.User_info({
       name:req.body.user_name,
       email:req.body.user_email,
       password:req.body.user_password,
       gender:req.body.user_gender,
       dob: req.body.user_dob,
       mobile_number:req.body.user_mobile_num,
       address: {city:req.body.user_city,state:req.body.user_state,
        country:req.body.user_country}
   });
   user.save();
   res.render("login_page");
}


function post_login(req,res){
    console.log("post_login_page opening");
     const Email = req.body.user_email;
     const Password = req.body.user_password;
     console.log(req.body);

     db.User_info.findOne({email:Email}).then((result)=>{
         console.log(result);
         if(result.password == Password){
             console.log("log in successful, you can proceed!!");
             res.render("index");
         }
         else{
             res.render("signup_page");
         }
         
     }).catch((err)=>{
         console.log(err);
         res.render("login_page");
     });

    
    
}

function post_otp_request(req,res){
    
    verifyRequestNumber = req.body.mobile_num;
    vonage.verify.request(
        {
            number: verifyRequestNumber,
            brand: vonage_brand_name,
        },
        (err,result) =>{
            if(err){
                console.error(err);

            }
            else{
                verifyRequestId = result.request_id;
                console.log(`request_id: ${verifyRequestId}`);
                if(result.status == "0") res.render("verifying-otp" , {number_type:"entered"});
                else       res.render("otp_login_page");

            }
        }
    );
}

function post_otp_verify(req,res){ let otp_Code = req.body.otp_code;
   console.log(verifyRequestId);
    vonage.verify.check({
      request_id : verifyRequestId,
      code : otp_Code,
  },
  (err,result) =>{
      if(err) console.error(err);
      else{
          if(result.status == 0){
              res.render("index");
              console.log("login via otp successful");
          }
          else res.render("verifying-otp");
      }
    }
  );
}

function post_forget_password(req, res){
    console.log("post_forget_password opening");
    const Email = req.body.user_email;

    console.log(req.body);

    db.User_info.findOne({email: Email}).then((result)=>{
        console.log(result);
      if(!result)
      {console.log("user is not signup");
    res.render("signup_page");}
      else{
      verifyRequestNumber = result.mobile_number;
    if(verifyRequestNumber.length){
    vonage.verify.request(
        {
            number: verifyRequestNumber,
            brand: vonage_brand_name,
        },
        (err,result) =>{
            if(err){
                console.error(err);

            }
            else{
                verifyRequestId = result.request_id;
                console.log(`request_id: ${verifyRequestId}`);
                if(result.status == "0") res.render("verifying-otp", {number_type:"registered",user_number : verifyRequestNumber });
                else       res.render("forget_password");

            }
        }
    );
    } }  
    }).catch((err)=>{
        console.log(err);
    });
   
}

function post_otp_verify_repassword(req,res){
    let otp_Code = req.body.otp_code;
    let  user_mobile_number = req.body.user_id_num;
    console.log(verifyRequestId);
    vonage.verify.check({
      request_id : verifyRequestId,
      code : otp_Code,
  },
  (err,result) =>{
      if(err) console.error(err);
      else{
          if(result.status == 0){
              res.render("reset_password" , {id: user_mobile_number});
              console.log("ready to reset password");
          }
          else res.render("verifying-otp", {number_type:"registered"});
      }
    }
  );
}

function post_reset_new_password(req, res){
    console.log("post_reset_new_password is opening");
    var new_password = req.body.new_password;
    var id = req.body.id;
    console.log(id);
    console.log(new_password);
    db.User_info.findOneAndUpdate({mobile_number:id},{$set:{password:new_password}},{new:true})
    .then((result) =>{
    console.log(result);
    if(result.password == new_password){
        res.render("login_page");
    }
    }).catch((err)=>{
        console.log(err); 
        res.render("login_page");
    });
}

module.exports = {
    get_login : get_login,
    get_signup : get_signup,
    get_otp_login : get_otp_login,
    get_verifying_otp : get_verifying_otp,
    get_forget_password : get_forget_password,
    post_signup : post_signup,
    post_login : post_login,
    post_otp_request: post_otp_request,
    post_otp_verify : post_otp_verify,
    post_forget_password : post_forget_password,
    post_otp_verify_repassword : post_otp_verify_repassword,
    post_reset_new_password : post_reset_new_password
}