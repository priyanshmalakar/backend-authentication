const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const cors = require('cors');
require("./conn/db");


app.use(cors());
app.use(express.json());
app.use('/try' ,userRouter);

app.listen(5000, ()=>{
    console.log("server is running");
})