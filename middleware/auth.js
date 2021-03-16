const JWT = require('jsonwebtoken');
const USER = require('../model/users');
const ADMIN = require('../model/admins');

const userAuth = (req, res, next) => {
    const token = req.cookies.login_token;

    //checking if jwt exists
    if(token){

        JWT.verify(token, process.env.TOKEN_SECRET, async (err, decodedtoken)=>{
            if (err) {
                res.redirect('/login');
                console.log(err.message);
            } else {
                const usr = await USER.findById(decodedtoken._id);
                req.user = {_id: usr._id, name: usr.name, role: usr.role, id: usr.id}
                next();
            }
        })

    } else {
        res.redirect('/login');
    } 
}

const adminAuth = (req, res, next) => {
    const token = req.cookies.admin_token;

    if(token){
        JWT.verify(token, process.env.TOKEN_SECRET, async (err, decodedtoken)=>{
            if (err) {
                res.redirect('/admin/login');
                console.log(err.message);
            } else {
                const usr = await ADMIN.findById(decodedtoken._id);
                req.user = {_id: usr._id, role: usr.role, id: usr.id}
                next();
            }
        })

    } else {
        res.redirect('/admin/login');
    } 
}

const authorize = (...roles)=> {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) {
            return res.send('NOT AUTHORIZED');
        }
        next();
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.login_token;

    if(token){
        JWT.verify(token, process.env.TOKEN_SECRET, async (err, decodedtoken)=>{
            if (err) {
                res.redirect('/login');

            } else {
                if (decodedtoken.role === 'student') res.redirect('/student');
                if (decodedtoken.role === 'teacher') res.redirect('/teacher');
                if (decodedtoken.role === 'employee') res.redirect('/employee');
                next();
            }
        })

    } else {
        res.redirect('/login');
    }
}

module.exports = { userAuth, adminAuth, authorize, checkUser };