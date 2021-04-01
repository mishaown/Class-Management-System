const mongoose = require('mongoose');
const { Schema } = mongoose;

const ATTENDANCE_RECORD = new Schema({
    student_id : {type:String}, 
    Class:  [{
        class_id: { type: String },
        session_record: [{
            date: { type: Date},
            status: { type: Number}
        }]
    }]
})

module.exports = mongoose.model('ATTENDANCE_RECORD', ATTENDANCE_RECORD);
