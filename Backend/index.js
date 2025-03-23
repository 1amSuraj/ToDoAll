const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const connectDB = require("./config/db");
const taskRoutes = require('./routes/taskRoutes');
app.use(express.json());

app.get('/', ()=>{
    console.log("called /")
});

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

connectDB();
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})
