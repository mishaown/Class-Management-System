const CLASS = require('../../model/class');
const ATTENDANCE_RECORD = require('../../model/attendance');

// @ROUTE   GET /teacher/myclasses/t-a/:_id
// @DEC     Route for teacher
// @ACCESS  Private

exports.takeattendance = async (req, res) => {
    try {
        const _id = req.params._id;
        const classDate = req.body.date;
        const students = req.body.students;

        //CREATING STUDENT ATTENDANCE ARRAY
        let data = [];
        students.forEach(async element => {
            data.push({
                    stu_ID: element.studentID,
                    stu_name: element.studentName,
                    status: element.studentStatus
            })

            const record = await ATTENDANCE_RECORD.updateOne({
                student_id : element.studentID,
                "Class.class_id" : _id}, {
                    $push: {
                        "Class.$.session_record" : {
                            date: classDate,
                            status: element.studentStatus
                        }   
                    }
                })
        });


        //THIS NEEDS TO BE FIXED
        const isSaved = await CLASS.findOneAndUpdate({
            _id}, {
                $push: {
                    classAttendance: {
                        sessionDate: classDate,
                        attendances: data
                    }
                }
        })

        
        if (isSaved) {
            res.json({success: true, isSaved})
        } else {
            res.json({success: false})
        }

    } catch (error) {
        res.json({ERROR: error.message})
        
    }   
}

// @ROUTE   GET /teacher/myclasses/t-a/:_id
// @DEC     Route for teacher
// @ACCESS  Private

exports.ta_page = async (req, res) => {

    try {
        const _id = req.params._id;
        const Class = await CLASS.findById(_id);

        let studentinfo = [];
        let count = 0;
        
        
        //FETCHING STUDENT INFO
        Class.classStudents.filter(item => {
            studentinfo.push({
                studentID: item.studentID,
                studentName: item.studentName
            })
            count++;
        })

        res.status(200);
        res.render('teacher/teacher_dash', {
                    title: 'Take Attendance', 
                    takeattendance: true, 
                    studentinfo,
                    count,
                    className: Class.className, 
                    usr_name: req.user.name, 
                    usr_id: req.user.id, 
                    class_id: _id});
    
    } catch (error) {
        return res.send(error.message);
    }
}
