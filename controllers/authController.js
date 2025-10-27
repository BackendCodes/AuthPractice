const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validatin
    if (!username || !email || !password) {
      return res.send("error while register | pleae fill all the fields");
    }
    if (password.length < 6) {
      return res.send("password length shoudl be greater than 6");
    }

    // check existing user
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      console.log("user alread exists");
      return res.redirect("/login");
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const registerdUser = await User.create({
      username,
      email,
      password: hashed,
    });

    return res.send(registerdUser);
  } catch (error) {
    console.log(error);
    return res.send("error occured");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  basic validation
    if (!email || !password) {
      return res.send("please provide all the fileds");
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not registerd");
      return res.render("register");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.send("password did not match");
    }

    res.send("user login success");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
