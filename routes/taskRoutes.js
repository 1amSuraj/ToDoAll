const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');
const authMiddleware = require('../middleware/authMiddleware.js');


router.post("/", authMiddleware, async (req, res) => {
    try {
      const { title,desc } = req.body;
      const newTask = new Task({ user: req.user.userId, title,desc });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/",authMiddleware, async(req,res)=>{
    try{
        const tasks = await Task.find({user:req.user.userId});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
});
  
module.exports = router;
