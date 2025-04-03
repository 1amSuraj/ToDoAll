const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const connectDB = require("./config/db");
const taskRoutes = require('./routes/taskRoutes');



app.use(cors({
    origin: 'http://localhost:3001'
}));


app.use(express.json());
app.get('/', ()=>{
    console.log("called /")
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

connectDB();
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})
