const mongoose = require("mongoose");
const User = require("../../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signUpUser = async (req, res) => {
  // destructure email and password from req.body
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).send("Please enter your email and password.");
    return;
  }
  //check if email is valid

  if (!validator.isEmail(email)) {
    res.status(400).send("Please provide a valid email");
    return;
  }
  //check if password is strong enough
  if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please provide a strong password");
    return;
  }

  try {
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    // salting and hashing password
    // salt is a random string that is adeed to the password
    // password --> 12345678
    // adding salt --> 12345678qwerty
    // hasing --> qwerty1232131231

    //gen salt 10 means that we are generating a salt of length 10
    const salt = await bcrypt.genSalt(10);

    //hashing algorithm uses SHA-256 by default
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userImage,
    });
    const token = createToken(newUser._id);
    res
      .status(200)
      .json({
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          userImage: newUser.userImage,
        },
        token,
      });

    // bcrypt.compare(hashedPassword, salt)
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
};
module.exports = { signUpUser };
