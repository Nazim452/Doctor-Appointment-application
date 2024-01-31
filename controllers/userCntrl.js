const userModel = require('../models/userModels')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment');



//Register
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email })
    if (existingUser) {
      console.log("User already registered");
      return res.status(400).json({
        success: false,
        message: "User already registered"
      })
    }

    const passWord = req.body.passWord;


    //Error - during Hashing Password__________________________TODO_____________________________



    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(passWord,salt);
    // const hashedPassword = await bcrypt.hash(passWord, salt)
    // req.body.password = hashedPassword;

    const newUSer = new userModel(req.body);
    await newUSer.save();
    res.status(200).send({
      success: true,
      message: "User saved successfully"
    })


  } catch (error) {
    console.log("Error in RegisterController", error);
    res.status(500).send({
      success: false,
      message: error.message

    })

  }

}



const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.status(200).send({
        message: "User not found",
        success: false
      })
    }

    // TODO_____________________________________Bcrypt.compare  karna hai ________

    if (user.password != req.body.password) {
      console.log("Email or password incorrect");
      return res.status(200).send({
        success: false,
        message: "Invalid password or Email",
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).json({ message: "Login successful", success: true, token })




  } catch (error) {
    console.log("Error in loginController");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message })

  }
}


const authController = async (req, res) => {
  try {

    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({

        message: 'User not found',
        success: false,
      })
    }
    else {
      res.status(200).send({
        success: true,
        // data:{
        //     name:user.name,
        //     email:user.email
        // },
        data: user


      })
    }


  } catch (error) {
    console.log("Error in USeCntrl ke auth Controller me", error);
    res.status(500).send({
      success: false,
      message: "auth Error",
      error
    })

  }
}

//saving dovtor data in MOngoDbB for each new Doctor

// const applyDoctorController=async(req,res)=>{
//     try {
//         const newDocotr = await doctorModel({...req.body,status:'pending'})  //jab tak admin accept nahi  karta tab tak pending me rahega
//         await newDocotr.save();
//         const adminUser = await userModel.findOne({isAdmin:true});
//         const notification = adminUser.notification;               //admin ke pass apply doctor ka notification aayega
//         notification.push({           //push method is applied here beacause this is array

//             type:'apply-doctor-request',
//             message:`${newDocotr.firstName} ${newDocotr.lastName} Has Applied For A Doctor Account`,
//             data:{
//                 doctorId:newDocotr._id,
//                 name:newDocotr.firstName+" "+newDocotr.lastName,
//                 onClickPath:'/admin/doctors'      // is par  hame all doctor ki list mil jaytegi
//             }


//         })
//         //Now we are updating user
//         await userModel.findByIdAndUpdate(adminUser._id,{notification})
//         res.status(200).json({success:true,message:"Docotor Account APplied Successfully"})
//     } catch (error) {
//         console.log("Error While applying -Docotr in useCntrl.js",error);
//         res.status(200).json({
//             success:false,
//             error:error,
//             message:"Error while applying -Docotr in useCntrl.js"
//         })

//     }

// }
// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};


//Notification Contrller

// const getAllNotificationController = async(req,res)=>{

//     try {
//         const user = await userModel.findOne({_id:req.body.userId});
//         const seennotification = user.seennotification;
//         const notification = user.notification;
//         seennotification.push(...notification);
//         user.notification = [];          //if notification seen then make into unseen
//         user.seennotification = notification;//if notification seen then make into unseen
//         const updateUser = await user.save();//then updated user with no notification

//         res.status(200).send({
//             success: true,
//             message:"All notifications marked as read",
//             data :updateUser           
//         })


//     } catch (error) {
//         console.log("Error in getAllNotificationController",error);
//         return res.status(500).json({
//             message:"Error in getAllNotNotificationController",
//             success:false,
//             error:error,
//         })

//     }


// }

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// const deleteAllNotificationController = async(req,res)=>{
//     try {
//         const  user= userModel.findOne({_id:req.body.userId});
//         user.notification = [];
//         user.seennotification = [];
//         const updatedUser = await user.save(); // Saving the notification in databse
//         updatedUser.password = undefined;
//         res.status(200).send({
//             success: true,
//             message:"Notification deleted successfully",
//             data:updatedUser,
//         })



//     } catch (error) {
//         console.log("Error in deleteAllNotificationController",error);
//         res.status(500).send({
//             success: false,
//             message: "UNable to delete all Notification",
//             error: error
//         })

//     }
// }

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
}


// get All Doct Controllers

const getAllDoctorController = async (req, res) => {
  try {
    // status of doctor:'approved' -  hai tab hi use show karn ahai
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'Doctor List fetched successfully',
      data: doctors,
    })

  } catch (error) {
    console.log("Error in getAll Doctor Controller", error);
    res.status(500).send({
      success: false,
      message: "unable to get all Doctor List",
      error,
    });

  }
}


//Book appoinent Controller


// const bookAppointmentController = async (req, res) => {
//   try {
//     //toISOString- me time and date ko convert karna hoga For comparison karne ke liye ki doctor is waqt khali hai yan hai
//     // req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
//     // req.body.time = moment(req.body.time, 'HH:mm').toISOString()
//     req.body.status = "pending";
//     const newAppointment = new appointmentModel(req.body);
//     await newAppointment.save();
//     const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });

//     user.notification.push({
//       type: "New-appointment-request",
//       message: `A new Appointment Request from ${req.body.userInfo.name}`,
//       onCLickPath: "/user/appointments",
//     });
//     await user.save();
//     res.status(200).send({
//       success: true,
//       message: "Appointment Book succesfully",
//     });
//   } catch (error) {
//     console.log("Error in booking Doctor appoinment", error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While Booking Appointment",
//     });
//   }
// };

const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};



//Bookin gavailabality Contro;;er

// const bookingAvailabilityController = async (req, res) => {
//   try {
//     // for check availability - first fetch date
//     const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
//     // We have given here gap for 1 hr---- for each user
//     const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
//     const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await appointmentModel.find({
//       doctorId,
//       date,
//       time: {
//         //gte - greater than equal to________//lte - less than equal to
//         // waisa time find karo jo fromTime se bara ho aur toTime se chhota ho
//         $gte: fromTime,
//          $lte: toTime
//       }
//     })
//     if(appointments.length>0){
//       return res.status(200).send({
//         message:"Appointment not available at this time",
//         success:true,
//       })
//     }
//     else{
//       return res.status(200).send({
//         success:true,
//         message:"Appointment Available at this time"
//       })
//     }

//   } catch (error) {
//     console.log("Error in booking Availability appoinment", error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While checking availability Appointment",
//     });


//   }
// }
// const bookingAvailabilityController = async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await appointmentModel.find({
//       doctorId,
//       date,
//       time: {
//         $gte: fromTime,
//         $lte: toTime,
//       },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not Availibale at this time",
//         success: true,
//       });
//     } else {
//       return res.status(200).send({
//         success: true,
//         message: "Appointments available",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error In Booking",
//     });
//   }
// };


const userAppointmentsController = async(req,res)=>{
  try {
    const appointments  = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success: true,
      message:"Users Appointments fetch successfully",
      data:appointments,
    })
    
  } catch (error) {
    console.log("Error n user Appointment Controller",error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in user  Appointment controller",
    });
    
  }

}


module.exports = {
  loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController,
  bookAppointmentController,
  userAppointmentsController
}















