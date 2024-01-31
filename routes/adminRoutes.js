const express = require('express');
const authMiddlwWare = require('../middleware/authMiddlwWare');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCntrl');

const router = express.Router();

//GET method - Get All the user____

router.get('/getAllUsers',authMiddlwWare,getAllUsersController)


//GET method - Get All the Doctor____

router.get('/getAllDoctors',authMiddlwWare,getAllDoctorsController)

//POst - Account sstats

router.post('/changeAccountStatus', authMiddlwWare,changeAccountStatusController)

module.exports =router;