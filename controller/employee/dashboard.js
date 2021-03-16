// @ROUTE   GET /employee
// @DEC     Route for employees
// @ACCESS  Private

exports.dash_employee = (req, res, next) => {
    
    res.status(200).render('employee/employee_dash', 
    {
        title: 'Employee Dashboard', 
        dashboard: true, 
        usr_name: req.user.name, 
        usr_id: req.user.id
    });
}
