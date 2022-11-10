const express = require('express');
const router = express.Router();
const{createAdmin,login,createStudent,filterStudents,deleteStudents} = require('../controllers/adminController');
const{authentication} = require('../middleWares/auth')

router.post('/createAdmin',createAdmin);
router.post('/login',login);
router.post('/createStudent/:id',authentication,createStudent)
router.get('/filterStudents',authentication, filterStudents)
router.delete('/deleteStudent/:id',authentication, deleteStudents)

module.exports = router;