// @ROUTE   GET /admin
// @DEC     Route for admin dashboard
// @ACCESS  Private

exports.dash_admin = (req, res, next) => {
    res.render('admin_dash', { title: 'Admin Dashboard'})
}