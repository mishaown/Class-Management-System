const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendance = new Schema({
    stu_ID: { type: String},
    stu_name: { type: String},
    status: { type: Number}
})

const session = new Schema({
    sessionDate: {type: Date, unique: true},
    attendances: {type: [attendance]}
})

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
    classStudents: [{
        studentID: String,
        studentName: String
    }],
    classAttendance: { 
        type: [session]
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }    
})

module.exports = mongoose.model('classes', CLASS);

