// @ROUTE   GET /employee
// @DEC     Route for employees
// @ACCESS  Private

exports.dash_employee = (req, res, next) => {
    
    res.status(200).render('employee_dash', {title: 'Employee Dashboard'});
}
