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
const { getmyarticles, newarticle, postarticle } = require('./controller/teacher/articles');
const { myclasses, addstudents, addstudentstoclass } = require('./controller/teacher/myclasses');

//EMPLOYEE CONTROLLERS
const { dash_employee } = require('./controller/employee/dashboard');
const { classmanage_get, getClasses, newClass } = require('./controller/employee/class-manage');

//GLOBAL CONTROLLER
const { logoutUser, logoutAdmin} = require('./controller/logout');
const { entry } = require('./controller/entry');

//GLOBAL ROUTE
router.get('/logout', logoutUser);
router.get('/logout_A', logoutAdmin);
router.get('/', checkUser);

//STUDENT ROUTE
router.get('/student', userAuth ,authorize('student'), dash_student)
router.get('/login', userLogin);
router.post('/login', userLogin_POST);

//TEACHER ROUTE
router.get('/teacher',userAuth ,authorize('teacher'), dash_teacher);
router.get('/teacher/myarticles', userAuth ,authorize('teacher'), getmyarticles);
router.get('/teacher/newarticle', userAuth ,authorize('teacher'), newarticle);
router.post('/teacher/postarticle', userAuth ,authorize('teacher'), postarticle);
router.get('/teacher/myclasses', userAuth, authorize('teacher'), myclasses);
router.get('/teacher/myclasses/:_id', userAuth, authorize('teacher'), addstudents);
router.post('/teacher/add-student-to-class', userAuth, authorize('teacher'), addstudentstoclass);


//EMPLOYEE ROUTE
router.get('/employee',userAuth , authorize('employee'), dash_employee);
router.get('/employee/classmanage', userAuth, authorize('employee'), classmanage_get);
router.get('/employee/getnames', getClasses);
router.post('/employee/new-class', newClass);

// ADMIN ROUTES 
router.get('/admin', adminAuth, authorize('admin'), dash_admin)
router.get('/admin/login', login);
router.post('/admin/login', login_POST);
router.get('/admin/create',  createUser);
router.post('/admin/create',  createUser_POST);
router.get('/admin/users',  allusers);
router.get('/admin/modify', adminAuth, authorize('admin'), modifyuser);
router.delete('/admin/delete', adminAuth, authorize('admin'), deleteuser);
router.put('/admin/update', adminAuth, authorize('admin'), updateuser);
 
//Master Admin
router.post('/createAdmin', createAdmin);


module.exports = router;