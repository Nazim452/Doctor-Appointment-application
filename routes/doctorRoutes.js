const express = require('express');
const router = express.Router();
const authMiddlwWare = require('../middleware/authMiddlwWare');
const { getDoctorInfoController, upDateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctotCntrl');

// Post|| single Doc info of Docotr

router.post('/getDoctorInfo',authMiddlwWare,getDoctorInfoController);

//POST - Update Profile
router.post('/updateProfile',authMiddlwWare,upDateProfileController)

//POSt - get Single Doctor info
router.post('/getDoctorById',authMiddlwWare,getDoctorByIdController);
module.exports = router;

//GEt || Appointmetns

router.get('/doctor-appointments',authMiddlwWare,doctorAppointmentsController);




router.post('/update-status',authMiddlwWare,updateStatusController);




