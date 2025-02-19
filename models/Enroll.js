const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnrollSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    courseId: {type: String, trim: true, required: true, maxLength:1000},
    paymentId: {type: String, trim: true, required: true, maxLength:5000},
    Address: {type: String, required: true, maxLength:2000},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('enrollments',EnrollSchema);