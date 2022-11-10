const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim : true

    },

    subjects: [{
        subject: String,
        marks: Number,
        _id: false  
    }],

    isDeleted: {
        type:Boolean,
        default:false
    }

},{timestamps:true})

module.exports = mongoose.model('student', studentSchema)