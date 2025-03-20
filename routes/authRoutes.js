const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require("../middleware/authMiddleware");


router.get('/find', () => {
    
    
    console.log("dfgdfg")
})

router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password,10);
      // Create a new user
      const newUser = new User({ name, email, password:hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.post("/login",async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const token = jwt.sign({userId:user._id},"hello",{expiresIn:"1h"});
    res.status(200).json({message:"Login successful",token});
  }
  catch(error){
    res.status(500).json({message:"Server error",error:error.message});
  }
});




router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;