const USER = require('../../model/users');

// @DEC     Route for admin to view all users
// @ROUTE   GET /admin/modifyuser
// @ACCESS  Private 
exports.allusers = async (req, res, next) => {
    try {
        const users = await USER.find();

        if(!users) return res.status(400).render('admin_dash', {title: 'List of all users', allusers: true });
        
        let userinfo = []
        
        if(users){ 
            users.forEach((user)=>{
                userinfo.push({
                    role: user.role,
                    name: user.name,
                    id: user.id,
                    email: user.email
                });
            })

        return res.render('admin/admin_dash', {title: 'List of all users', userinfo, allusers: true})
        }
        
    } catch (error) {
        return res.status(400).send(`ERROR: ${error.message}`);
    }
}

