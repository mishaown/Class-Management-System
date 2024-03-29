const CLASS = require('../../model/class');
const USER = require('../../model/users');
const ATTENDANCE_RECORD = require('../../model/attendance');


// @ROUTE   GET /teacher/my-classes
// @DEC     Route for employees
// @ACCESS  Private

exports.myclasses = async (req, res, next) => {

    try {
        const classes = await CLASS.find({classTeacherID: req.user.id});
        let classlist = [];

        classes.forEach( item => {
            classlist.push({ 
                classID: item._id,
                classSemester: item.classSemester, 
                className: item.className, 
            });            
        })

        res.status(200);
        res.render('teacher/teacher_dash', {title: 'Enroller Classes', myclasses: true, usr_name: req.user.name, usr_id: req.user.id, classlist});
    
    } catch (error) {
        return res.send(error.message);
    }
} 

// @ROUTE   GET /teacher/myclasses/:_id
// @DEC     Route for employees
// @ACCESS  Private
exports.addstudents = async(req, res)=> {
    try {
        
        const _id = req.params._id;
        const classes = await CLASS.findById(_id);
        const users = await USER.find({role: 'student'});        

        let userinfo = []
        let studentinfo = []


        for (var i=0; i<classes.classStudents.length; i++) {
            studentinfo.push({
                studentID: classes.classStudents[i].studentID,
                studentName: classes.classStudents[i].studentName 
            })
        }

        if(users){ 
            users.forEach((user)=>{
                userinfo.push({
                    _id: user._id,
                    name: user.name,
                    id: user.id,
                });
            })
        }

        res.status(200)
        res.render('teacher/teacher_dash', {title: 'Enroller Classes', classes, userinfo, studentinfo ,addstudents: true, usr_name: req.user.name, usr_id: req.user.id});


    } catch (error) {
        res.status(400).send(error.message) 
    }
}

 
// @ROUTE   GET /teacher/add-student-to-class
// @DEC     Route for employees
// @ACCESS  Private
exports.addstudentstoclass = async(req, res, next)=> {
    try {
        const studentID = req.body.stu_id;
        const studentName = req.body.stu_name;
        const classID = req.body.classID;

        const isSaved = await CLASS.findOneAndUpdate({
            _id: classID
        }, {
            $push: {
                classStudents: {
                    studentID, studentName
                }
            }
        })
        const record = await ATTENDANCE_RECORD.create({
            student_id: studentID,
            Class: {
                class_id: classID
            }
        })

        console.log('New Record Created!');

        if (isSaved) {
            res.status(200).json({success: true, isSaved})
        }
        else{
            res.status(403).json({message: 'Can not save this student'})
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }
}