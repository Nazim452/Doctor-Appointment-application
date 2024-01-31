const doctorModel = require('../models/doctorModel')
const appointmentModel= require('../models/appointmentModel');
const userModel = require('../models/userModels');
const getDoctorInfoController=async(req,res)=>{

    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        res.status(200).send({
            success: true,
            message: "Doctor data fetched successfully",
            data: doctor,
          });
        
    } catch (error) {
        console.log("Error in getDoctorInfoController",error);
        res.status(500).send({
            message: "Error in fetching doctor details getDoctorInfoController",
            success: false,
            error,
          });
        
    }

    }

//UPdate PRofile Doctor
const upDateProfileController = async(req,res)=>{
    try {
        // (userId:req.body.userId--_)__ ise find karo and (req.body)isko update kakro
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(200).send({
            success: true,
            message:"Doctor Profile updated successfully",
            data: doctor
        })
    } catch (error) {
        console.log("Error in UpdateProfile Controller",error);
        res.status(500).send({
            message: " UpdateProfileController  update issue",
            success: false,
            error,
          });
        
    }
}

//get Single Docotr

const getDoctorByIdController =async(req,res)=>{
    try {
        const doctor =await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            success:true,
            message: "Single Doc info fethced",
            data:doctor,
        })
        
    } catch (error) {
        console.log("Error in getDoctor BY Id Controller",error);
        res.status(500).send({
            message: "Error in Single Docotr ingfo",
            success: false,
            error,
          });
        
    }

}


const doctorAppointmentsController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointments = await appointmentModel.find({
            doctorId:doctor._id,
        })
        
        res.status(200).send({
            success: true,
            message:"Doctor Appointmets fetched successfully",
            data:appointments,
        })
        
    } catch (error) {
        console.log("Error in DocotorApppointments Controller",error);
        res.status(500).send({
            success: false,
            message: "Error in  Docotr Appointmets",
            error,
          });
        
    }

}

// const updateStatusController =async(req,res)=>{
//     try {
//         const {appointmentsId,status}= req.body;
//         // OR - {status:status}|| if key value same the we can write any one
//         const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
//         //send Notification to the user your appoinmet Approved
//         const user = await userModel.findOne({ _id: appointments.userId });
//         const notification = user.notification;
//         notification.push({
//           type: "Status Updated",
//           message: `Your appointent has been updated ${status}`,
//           onCLickPath: "/doctor-appointments",
//         });
//         await user.save();
//         res.status(200).send({
//             success: true,
//             message:"Appointments updated successfully"
//         })
        
//     } catch (error) {
//         console.log("Error in Update Status Controller",error);
//         res.status(500).send({
//             success: false,
//             message: "Error in  Update Status Controller",
//             error,
//           });
        
        
//     }

// }
const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };
  




module.exports= {getDoctorInfoController,upDateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController}