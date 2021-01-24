const USER = require('../../model/users');


// @DEC     Route for admin to find users
// @ROUTE   GET /admin/users
// @ACCESS  Private 
exports.find_user = async (req, res, next)=>{
    try {
        const users = await USER.findOne({id: req.body.id});
        if(users) return res.json(users);
        if(!users) return res.send('No data found');
        
    } catch (error) {
        return res.send(`ERROR: ${error.message}`);
    }
}

// @DEC     Route for admin to modidy users
// @ROUTE   GET /admin/modifyuser
// @ACCESS  Private 

exports.modifyuser = async (req, res, next) => {

    try {
        const users = await USER.find();
        
        if(!users) 
        return res.status(400)
        .render('admin_dash', {modifyuser: true, title: 'List of all users'});

        let userinfo = []
        
        if(users){ 
            users.forEach((user)=>{
                userinfo.push({
                    _id: user._id,
                    role: user.role,
                    name: user.name,
                    id: user.id,
                    email: user.email
                });
            })


        res.render('admin_dash', 
            { modifyuser: true, title: 'List of all users', userinfo});
        }
        
    } catch (error) {
        
        return res.status(400).send(`ERROR: ${error.message}`);
    }
}

// @DEC     Route for admin to delete users
// @ROUTE   POST /admin/deleteuser
// @ACCESS  Admin 

exports.deleteuser = async (req, res, next) => {

    const user = await USER.deleteOne({id: req.body.id});

    if(user) return res.status(200).json({success: true});
    if(!user) return res.status(400).send('No data found');
}

exports.updateuser = async (req, res, next) =>{
    try {
        const { id, name, email, password } = req.body;
        const user = await USER.findOneAndUpdate({ id, name, email, password });
        
        if(!user) return res.status(400).send('Update Error');    
        if(user) return res.status(200).json({success: true});
        

    } catch (error) {
        return res.status(400).send(`ERROR: ${error.message}`);
        
    }


}