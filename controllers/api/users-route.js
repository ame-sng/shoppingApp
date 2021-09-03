const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require('jsonwebtoken');

//Item Model
const User = require("../../models/user")

 
//* @route POST api/users
//* @desc Register new user
//* @access Public

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //Simple Validation
  if(!name || !email || !password){
    return res.status(400).json({ msg: "Please enter all fields" })
  }

  //Check for exisiting user
  try{
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const userPassword = await bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    req.body.password = userPassword
    User.create(req.body, (err, createdUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      const token = jwt.sign(
        { _id: createdUser._id }, 
        process.env.TOKEN_SECRET, 
        { expiresIn: "24h"})
      res.status(200).json({
        token,
        user:{
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        }
      });
    })
  } catch (err){
    res.status(400).json({ error: err.message })
  }
});



module.exports = router;