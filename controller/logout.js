exports.logoutUser = (req, res, next)=> {
    
    res.cookie('login_token', '', {maxAge: 1})
    res.redirect('/login');
}