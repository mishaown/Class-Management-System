const mongoose = require('mongoose');
const { Schema } = mongoose;

const CLASS = new Schema({
    
    classOfDept: String,

    className: {
        type: String,
        required: true
    },
    classSemester: {
        type: String,
        required: true
    },
    classTeacherName: {
        type: String,
        required: true
    },
    classTeacherID: {
        type: String,
        required: true
    },

    classStart: {
        type: Date
    },
    classStudents: [String], 
    createdAt: {
        type: Date,
        default: Date.now
    }    
})

module.exports = mongoose.model('classes', CLASS);

