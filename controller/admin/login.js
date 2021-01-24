const JWT = require('jsonwebtoken');
const ADMIN = require('../../model/admins');

// handle errors
const handleErrors = (err) => {
    let errors = { id: '', password: '' };
  
    // incorrect id
    if (err.message === 'Incorrect id') {
      errors.id = 'Incorrect ID';
    }
    // incorrect password
    if (err.message === 'Incorrect password') {
      errors.password = 'Incorrect password';
    }
    // duplicate id error
    if (err.code === 11000) {
      errors.id = 'ID already exists';
      return errors;
    }
    // validation errors
    if (err.message.includes('admins validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }
 

//Creating JSON WEB TOKEN
const maxAge = 3 * 24 * 60 * 60;
const createToken = (admin) => {
  return JWT.sign( admin, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  }); 
};

// @ROUTE   GET /admin/login
// @DEC     Route for admins to login
// @ACCESS  Public

exports.login = (req, res, next) => {
    res.render('adminlogin', {title: 'Admin Login'})
}

// @ROUTE   POST /admin/login
// @DEC     Route for admins to login
// @ACCESS  Public

exports.login_POST = async (req, res, next) => {
    const { role, id, password } = req.body;
    try { 
        const admin = await ADMIN.login(role, id, password)
        const payload = {_id: admin._id, name: admin.name, role: admin.role}
        const token = createToken(payload);
        res.cookie('admin_token', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json(payload)

    } catch (err) {
      console.log(err.message);
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
} 