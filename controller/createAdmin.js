const ADMIN = require('../model/admins');

const handleError = (err)=> {

    let errors = { id: '',  password: '', name: ''}

    //Checking if id alreay exists
    if(err.code === 11000){
        errors.id = 'This ID already exists!'
    }

    //Validation
    if (err.message.includes('admins validation failed')) {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

exports.createAdmin = async (req, res, next)=>{
    const { role, id, name, password } = req.body;

    try {
        const isSaved = await ADMIN.create({ role, id, name, password })

        if(isSaved) {

            return res.status(201).json(isSaved)
        } else {

            return res.status(400).send('Can not add')
        }
        
    } catch (err) {
        const errors = handleError(err);
        return res.status(400).json(errors)
    }
}