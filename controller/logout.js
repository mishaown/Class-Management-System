exports.logoutUser = (req, res, next)=> {
    
    res.cookie('login_token', '', {maxAge: 1})
    res.redirect('/login');
}

exports.logoutAdmin = (req, res, next)=> {
    
    res.cookie('admin_token', '', {maxAge: 1})
    res.redirect('/admin/login');
}