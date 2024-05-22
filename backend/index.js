const express = require('express');
require('dotenv').config();
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
const uri = process.env.MONGOOSE_URI;
mongoose.connect(uri);
app.listen(3000, () => console.log('Server running on port 3000'));