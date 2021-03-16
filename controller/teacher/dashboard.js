// @ROUTE   GET /teacher
// @DEC     Route for teachers
// @ACCESS  Private

exports.dash_teacher = (req, res, next) => {
    
    res.status(200).render('teacher/teacher_dash', {title: 'Teacher Dashboard', dashboard: true, usr_name: req.user.name, usr_id: req.user.id});
}
