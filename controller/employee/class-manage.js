const USER  = require('../../model/users');
const CLASS = require('../../model/class');

// @ROUTE   GET /employee/class-manage
// @DEC     Route for employees
// @ACCESS  Private

exports.classmanage_get = async (req, res, next) => {
    try {
        const classes = await CLASS.find();
        let classlist = [];

        classes.forEach( item => {

            classlist.push({ 
                classOfDept: item.classOfDept, 
                classSemester: item.classSemester, 
                className: item.className, 
                classTeacher: item.classTeacherName
            });            
        })

        res.status(200).render('employee/employee_dash', 
        {
            title: 'Class management', 
            classmanage: true, 
            usr_name: req.user.name, 
            usr_id: req.user.id,
            classlist
        });

    } catch (error) {
        res.send(error.message);
    }
}
 
// @ROUTE   GET /employee/getnames
// @DEC     Route for employees
// @ACCESS  Private
exports.getClasses = async (req, res, next)=>{
    try {

        const teachers = await USER.find({role: 'teacher'});
        let teacher = [];

        teachers.forEach( item => {
            teacher.push({name: item.name, _id: item._id});
        });

        res.json(teacher);

    } catch (error) {
        res.send(error.message);

    }
}

// @ROUTE   GET /employee/new-class
// @DEC     Route for employees
// @ACCESS  Private

exports.newClass = async(req, res, next) => {
    try {

        const { classOfDept, classSemester, classTeacher, className } = req.body;

        const teacher = await USER.findById(classTeacher)

        const saved = await CLASS.create({ classOfDept, className, classSemester, classTeacherName: teacher.name, classTeacherID: teacher.id })

        if (saved) {

            return res.status(200).json({success: true})

        } else {
            res.status(400).send('Can not save')
        }

    } catch(error) {
        res.send(error.message);
    }
}