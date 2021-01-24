// @ROUTE   GET /student
// @DEC     Route for students
// @ACCESS  Private

exports.dash_student = (req, res, next) => {
    
    res.status(200).render('student_dash', {title: 'Student Dashboard'});
}
