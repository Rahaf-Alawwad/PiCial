const express= require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require("cors")
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB, {useUnifiedTopology:true, useNewUrlParser: true},()=> console.log("Connected to DB"))


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

app.use("/v1/user", require("./routes/user"))
app.use("/v1/photographer", require("./routes/photographer"))




app.listen(PORT , ()=> console.log(`Connected to ${PORT}`));