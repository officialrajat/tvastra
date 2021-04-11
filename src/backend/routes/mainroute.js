const express = require("express");
const MainController = require("../controllers/MainController");
const LoginController = require("../controllers/LoginController");
const app = express();
const  router = express.Router();
router.route("/").get(MainController.index); 
router.route("/search_results").post(MainController.search_results);
router.route("/Dentistry").get(MainController.get_dentistry);
router.route("/Cancer").get(MainController.get_cancer);
router.route("/about-hospital").get(MainController.get_about_hospital);
router.route("/about-us").get(MainController.get_about_us);
router.route("/appointment").get(MainController.get_appointment);
router.route("/contact-us").get(MainController.get_contact_us);
router.route("/doctors-profile-johnNission").get(MainController.get_doctors_profile);
router.route("/FAQ").get(MainController.get_faq_page);
router.route("/query-page").get(MainController.get_query_page);


router.route("/login_page").get(LoginController.get_login);
router.route("/signup_page").get(LoginController.get_signup);
router.route("/otp_login_page").get(LoginController.get_otp_login);
router.route("/verifying-otp").get(LoginController.get_verifying_otp);
router.route("/forget_password").get(LoginController.get_forget_password);
/*  post-requests-render*/ 
router.route("/signup").post(LoginController.post_signup);
router.route("/login").post(LoginController.post_login);
router.route("/otp_request").post(LoginController.post_otp_request);
router.route("/otp_verify").post(LoginController.post_otp_verify);
router.route("/forget_password").post(LoginController.post_forget_password);
router.route("/otp_verify_for_repswrd").post(LoginController.post_otp_verify_repassword);
router.route("/reset_password").post(LoginController.post_reset_new_password);

module.exports = router;