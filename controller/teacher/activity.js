const CLASS = require('../../model/class');

// @ROUTE   GET /teacher/attendance-activity
// @DEC     Route for teacher
// @ACCESS  Private

exports.att_act = async (req, res) => {

    try {
        let Class = [];

        const record = await CLASS.find({classTeacherID: req.user.id});

        record.filter( item => {

            Class.push({
                className: item.className,
                class_id: item._id
            })

        });

        res.status(200);
        res.render('teacher/teacher_dash', {
                    attendance_activity: true,  
                    title: 'Attendance Activity',
                    Class,
                    usr_name: req.user.name, 
                    usr_id: req.user.id,
                });

    } catch (error) {
        return res.status(400).send(error.message);
    }
}

// @ROUTE   GET /teacher/get-Class-Date/:_id
// @DEC     Route for teacher
// @ACCESS  Private

exports.getDates = async (req, res) => {
    try {
        const _id = req.params._id;

        const Class = await CLASS.findById(_id);

        return res.status(200).json({
            success: true,
            classAttendance:  Class.classAttendance
        });
        
    } catch (error) {
        res.json({error: error.message, success: false});
    }
}