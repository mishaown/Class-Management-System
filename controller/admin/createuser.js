const USER = require('../../model/users');

const handleError = (err)=> {

    let errors = { id: '', email: '',  password: '', name: ''}

    //Checking if id alreay exists
    if(err.code === 11000){
        errors.id = 'This ID aleraay exists!'
    }

    //Validation
    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

// @ROUTE   GET /admin/create
// @DEC     Route for creating new user
// @ACCESS  Private
exports.createUser = (req, res) => {

    res.render('admin_dash', {title: 'Create New User', createuser: true})
}

// @ROUTE   POST /admin/create
// @DEC     Route for creating new user
// @ACCESS  Private
exports.createUser_POST = async (req, res) => {
    try {
        const { role, id, name, email, password } = req.body;

        let errors = [];

        const isSaved = await USER.create({ role, id, name, email, password })

        if(isSaved) {
            errors.push({msg: 'New User Added'});
            return res.status(201).render('admin_dash', {title: 'Register New User', createuser: true, success: {message: 'New User Added'}})
        } else {

            errors.push({msg: 'Can not create user now'});
            return res.status(400).render('admin_dash', {title: 'Register New User', createuser: true, errors})
        }
    
    } catch (err) {
        const errors = handleError(err);
        return res.status(400).send(errors)
    }
}
