const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');
const authMiddleware = require('../middleware/authMiddleware.js');

//add tasks with description
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
//all tasks
router.get("/",authMiddleware, async(req,res)=>{
    try{
        const tasks = await Task.find({user:req.user.userId});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
});

//update
router.get('/:id',authMiddleware, async(req,res)=>{
  try{
    const task = await Task.findById(req.params.id);
    if(!task || task.user.toString()!==req.user.userId){
      return res.stauts(404).json({message:"Task not found"});
    }
    task.completed = req.body.completed ?? task.completed;

    await task.save();
    res.json(task);
  }
  catch(error){
    res.status(500).json({message:"Server error"});
  }
})
  
//edit
router.get('/edit/:id',authMiddleware, async(req,res)=>{
  try{
    const task = await Task.findById(req.params.id);
    const {title, desc} = req.body;
    if(!task || task.user.toString()!==req.user.userId){
      return res.stauts(404).json({message:"Task not found"});
    }
    task.completed = req.body.completed ?? task.completed;
    task.title = title;
    task.desc = desc;
    await task.save();
    res.json(task);
  }
  catch(error){
    res.status(500).json({message:"Server error"});
  }
})
module.exports = router;
