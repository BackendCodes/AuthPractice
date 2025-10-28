const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectdb = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");

const requireAuth = require('./middleware/auth')

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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



app.get('/dashboard',requireAuth,(req,res)=>{
   res.render('dashboard',{ user: req.user })
})


app.get('/logout',(req,res)=>{
   res.clearCookie('token');
   res.redirect("/login")
})

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
