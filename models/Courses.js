const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{type:String, trim:true, required: true, maxLength:1000},
    description:{type:String, trim:true, required: true, maxLength:5000},
    image:{type:String, required: true, maxLength:2000},
    category:{type:String, trim:true, required: true, maxLength:200},
    duration:{type:Number, required: true},
    price:{type:Number, required: true},
    language:{type:String, required: true},
    rating:{type:Number, required: true},
    numReviews:{type:Number, required:true},
    enrolledStudents:{type:Number, required: true},
    date:{type:Date, default: Date.now}
})

module.exports = mongoose.model('course',CourseSchema);