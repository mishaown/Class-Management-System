const router = require('express').Router();
const { userAuth, adminAuth , authorize, checkUser } = require('./middleware/auth');

//MASTERADMIN
const { createAdmin } = require('./controller/createAdmin');

//ADMIN CONTROLLER
const { dash_admin } = require('./controller/admin/dashboard');
const { login, login_POST } = require('./controller/admin/login');
const { createUser, createUser_POST } = require('./controller/admin/createuser');
const { allusers } = require('./controller/admin/showusers');
const { modifyuser } = require('./controller/admin/modifyuser');
const { deleteuser } = require('./controller/admin/deleteuser');
const { updateuser } = require('./controller/admin/updateuser');

//STDENT CONTROLLERS
const { dash_student } = require('./controller/student/dashboard');
const { userLogin, userLogin_POST} = require('./controller/login');

//TEACHER CONTROLLERS
const { dash_teacher } = require('./controller/teacher/dashboard');

//EMPLOYEE CONTROLLERS
const { dash_employee } = require('./controller/employee/dashboard');

//GLOBAL CONTROLLER
const { logoutUser} = require('./controller/logout');
const { entry } = require('./controller/entry');

//GLOBAL ROUTE
router.get('/logout', logoutUser);
router.get('/', checkUser);

//STUDENT ROUTE
router.get('/student', userAuth ,authorize('student'), dash_student)
router.get('/login', userLogin);
router.post('/login', userLogin_POST);

//TEACHER ROUTE
router.get('/teacher',userAuth ,authorize('teacher'), dash_teacher);

//EMPLOYEE ROUTE
router.get('/employee',userAuth ,authorize('employee'), dash_employee);


// ADMIN ROUTES 
router.get('/admin', adminAuth, authorize('admin'), dash_admin)
router.get('/admin/login', login);
router.post('/admin/login', login_POST);
router.get('/admin/create', adminAuth, authorize('admin'), createUser);
router.post('/admin/create', createUser_POST);
router.get('/admin/users', adminAuth, authorize('admin'), allusers);
router.get('/admin/modify', adminAuth, authorize('admin'), modifyuser);
router.delete('/admin/delete', deleteuser);
router.put('/admin/update', updateuser);
 
//Master Admin
router.post('/createAdmin', createAdmin);

router.get('/test', (req, res, next)=>{
    
    res.cookie('TestToken', true)
    res.send('YOu got cookies');
})

router.get('/test2', (req, res, next)=>{
    
    const cookies = req.cookies;

    res.json({message: cookies})

})

module.exports = router;