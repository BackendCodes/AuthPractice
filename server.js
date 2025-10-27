const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs")

const cors = require("cors");
const connectdb = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");


connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
   res.render('index')
});

app.get("/register", (req, res) => {
   res.render('register')
});

app.get('/login',(req,res)=>{
    res.render('login')
})

app.use("/test", authRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
