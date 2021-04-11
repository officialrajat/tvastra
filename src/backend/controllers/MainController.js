const express  = require("express");
const app  = express();

function index(req,res){
    res.render("index");
}
function search_results(req,res){
   console.log("req.body=")
   console.log(req.body);
   var result = req.body.search_keyword;
   console.log(result);
   res.redirect(result);
}

function get_dentistry(req,res){
    res.render("Dentistry");
}
function get_cancer(req,res){
    res.render("Cancer");
}
function get_about_hospital(req,res){
    res.render("about-hospital");
}

function get_about_us(req,res){
    res.render("about-us");
}

function get_appointment(req,res){
    res.render("appointment");
}
function get_contact_us(req,res){
    res.render("contact-us");
}
function get_doctors_profile(req,res){
    res.render("doctors-profile-johnNission");
}
function get_faq_page(req,res){
    res.render("FAQ");
}
function get_query_page(req, res){
    res.render("query-page");
}

module.exports = {
    index : index,
    search_results:search_results,
    get_dentistry:get_dentistry,
    get_cancer:get_cancer.apply,
    get_about_hospital : get_about_hospital,
    get_about_us : get_about_us,
    get_appointment : get_appointment,
    get_contact_us : get_contact_us,
    get_doctors_profile : get_doctors_profile,
    get_faq_page : get_faq_page,
    get_query_page : get_query_page
}