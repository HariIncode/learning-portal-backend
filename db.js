const mongoose = require('mongoose');

// Connection string for your MongoDB instance
const mongoURI = 'mongodb://localhost:27017/Guvi-react';

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => console.log("DB Connected to Guvi-react"))
    .catch(err => console.log("Error connecting to DB:", err));
};

module.exports = connectToMongo;
