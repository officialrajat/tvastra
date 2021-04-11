const express= require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path"); 
const mainRoutes = require("./backend/routes/mainroute");
app.use(cors()); //Line1
app.use(compression()); //Line2
app.use(bodyParser.urlencoded({ extended: true })); //Line3
app.use(bodyParser.json()); //Line4

app.set("views", __dirname +"/client/views"); //line5
app.engine("html", require("ejs").renderFile); //Line6 
app.set("view engine", "ejs"); //Line7
app.use(express.static(path.resolve(__dirname, "./client"))); //Line8

app.use("/", mainRoutes); //Line10

app.set("port",process.env.PORT||4000);
app.listen(app.get("port"),()=> {
    console.log("Application running.." + app.get("port"));
});

module.exports = app;