// @ROUTE   GET /teacher
// @DEC     Route for teachers
// @ACCESS  Private

exports.dash_teacher = (req, res, next) => {
    
    res.status(200).render('teacher_dash', {title: 'Teacher Dashboard'});
}
