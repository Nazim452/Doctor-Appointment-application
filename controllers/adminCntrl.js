const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getAllUsersController = async(req,res)=>{

    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message:'Users data list',
            data:users,
        })
        
    } catch (error) {
        console.log("Error in getAllUsersController",error);
        res.status(500).send({
            success: false,
            message:"Error While fetching users",
            error: error
        })
        
    }

}
const getAllDoctorsController = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message:'Docotrs data list',
            data:doctors,
        })

        
    } catch (error) {
        console.log("Error while fetching GetallDoctorController",error);
        res.status(500).send({
            success: false,
            message:"Error While fetching doctors data",
            error: error
        })
        
    }

}

// const changeAccountStatusController=async(req,res)=>{
//     try {
//         const {doctorId,status} = req.body; //$ auth middleware ke ander already user ki id presen hia___________ frontend se ham doctorId and status le rahe hai
//         const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})//status change karna hai islye  status pass ho raha  hai
//         const user = await userModel.findOne({_id:doctor.userId})// for sending notification to user we fetching user ID ___ki aapik approved succes ho chuka hai
//         // _____jab - doctor get hoga to uske ander id ki bhi field hogi
//         const notification = user.notification;
//         notification.push({
//             type:"Doctor Account Request Updated",
//             message:`Your Doctor account Request has ${status}`,
//             onClickPath:'/notification',

//         });

//         // jo isDoctor False hai hame use true bhi banana hai_____
//         user.isDoctor==='approved'?true: false;
//         //Save in DB
//         await user.save();
//         res.status(201).send({
//             success: true,
//             message:"Account status Updated successfully",
//             data:doctor,
//         })


        
//     } catch (error) {
//         console.log("Error in changeAccountStatusController",error);
//         res.status(500).send({
//             success: false,
//             message:"Error While changing account status",
//             error: error
//         })
        

        
//     }

// }




// const changeAccountStatusController = async (req, res) => {
//     try {
//       const { doctorId, status } = req.body;
//       const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
//       const user = await userModel.findOne({ _id: doctor.userId });
//       const notification = user.notification;
//       notification.push({
//         type: "doctor-account-request-updated",
//         message: `Your Doctor Account Request Has ${status} `,
//         onClickPath: "/notification",
//       });
//       user.isDoctor =status=== "approved" ? true : false;
//       await user.save();
//       res.status(201).send({
//         success: true,
//         message: "Account Status Updated",
//         data: doctor,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Eror in Account Status",
//         error,
//       });
//     }
// }

const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      const notification = user.notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved"? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
}
module.exports ={getAllDoctorsController,getAllUsersController,changeAccountStatusController}








