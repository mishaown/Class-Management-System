const JWT = require('jsonwebtoken');
const USER = require('../model/users');

// handle errors
const handleErrors = (err) => {
    let errors = { id: '', password: '' };
  
    // incorrect id
    if (err.message === 'incorrect id') {
      errors.id = 'That id is not registered';
    }
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'This password is incorrect';
    }
    // duplicate id error
    if (err.code === 11000) {
      errors.id = 'This id is already registered';
      return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }
 

//Creating JSON WEB TOKEN
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return JWT.sign( user, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  }); 
};
 

// @ROUTE   GET /login
// @DEC     Route for users to login
// @ACCESS  Public

exports.userLogin = (req, res, next) => {
    res.render('userlogin', {title: 'User Login'})
} 

// @ROUTE   POST /login
// @DEC     Route for users to login
// @ACCESS  Public

exports.userLogin_POST = async (req, res)=>{

    const { role, id, password } = req.body;

    try {
        const user = await USER.login(role, id, password);
        const payload = { _id: user._id, name: user.name, role: user.role }
        const token = createToken(payload);
        res.cookie('login_token', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json(payload)
    
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
