const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();

const SignUp = async (req, res, next) => {
  try {
    const { username, email, fullName, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = await User.create({
      username,
      email,
      fullName,
      password: hash
    });
    return res.status(200).json({
      status: "success",
      data: user
    });
  } catch (e) {
    const err = new Error("Unable to create User");
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      const err = new Error("User with this username doesn't exist");
      next(err);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      const err = new Error("Invalid credential");
      next(err);
    }
    const token = GenerateToken(user._id);
    await res.cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
      signed: true,
      secure: true
    });

    return res.status(200).json({
      status: "success",
      message: "user logged In",
      user_fullName: user.fullName
    });
  } catch (e) {
    const err = new Error("Unable to Login the User");
    next(err);
  }
};

const GenerateToken = (userId) => {
  const payload = {
    id: userId
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d"
  });

  return token;
};

module.exports = {
  SignUp,
  Login
};
