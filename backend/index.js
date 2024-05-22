const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRouter = require("./routes/user");
// const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/user", userRouter)

//Connect to mongoDb
mongoose.connect('mongodb+srv://pratiknand5:Uy3KiRbVFaA4uMCj@cluster0.eehxhmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.listen(3000, () => console.log('Server running on port 3000'));