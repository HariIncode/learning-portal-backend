// Get the db ile to run the file
const connectToMongo = require('./db');
// run the function
connectToMongo();

const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors())

app.use(express.json());

// API routing
app.use('/api/auth',require('./routes/Auth'));
app.use('/api/add/',require("./routes/Course"));
app.use('/api/course/',require("./routes/Enrollment"));

app.listen(port,()=>console.log("App listerning at the port", port));

// http//5000/api/auth/routes/auth/createUser