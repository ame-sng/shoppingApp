const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/authToken")

//Item Model
const User = require("../../models/user")

 
//* @route POST api/auth
//* @desc Authenticate user
//* @access Public

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if(!email || !password){
    return res.status(400).json({ msg: "Please enter all fields" })
  }

  //Check for exisiting user
  try{
    const user = await User.findOne({ email });
    if (!user) throw Error("User doesn't exist");

    //Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
    if (!token) throw Error('Couldnt sign the token');
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err){
    res.status(400).json({ error: err.message })
  }
});

//* @route GET api/auth/user
//* @desc Get user data
//* @access Private

router.get("/user", auth, async (req, res)=> {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) throw Error("User does not exist");
    res.json(user)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
});

module.exports = router;