
const express = require('express');
const { loginController,
    registerController,
     authController ,
     applyDoctorController,
     getAllNotificationController,
     deleteAllNotificationController,
     getAllDoctorController,
     bookAppointmentController,
     userAppointmentsController,
    //  bookingAvailabilityController,
  
  
     } = require('../controllers/userCntrl');
const authMiddlwWare = require('../middleware/authMiddlwWare');

//router obj
const router = express.Router();

//routes    

// login - post
router.post("/login",loginController);

//regidter - post
router.post("/register",registerController);


router.post('/getUserData',authMiddlwWare,authController);

//Apply-Doctor

router.post('/apply-doctor',authMiddlwWare,applyDoctorController);

//Notification
router.post('/get-all-notification',authMiddlwWare,getAllNotificationController);
router.post('/delete-all-notification',authMiddlwWare,deleteAllNotificationController);




//Get all doctor list for apply patiient
router.get('/getAllDoctor',authMiddlwWare,getAllDoctorController);

//BOOk appointments

router.post('/book-appointment',authMiddlwWare,bookAppointmentController);

//Booking Availability
// router.post('/booking-availability',authMiddlwWare,bookingAvailabilityController);

//Appointment List

router.get('/user-appointments',authMiddlwWare,userAppointmentsController);
module.exports = router;







