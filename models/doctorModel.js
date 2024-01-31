
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,

    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    feesPerCunsaltation:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:'pending',

    },
    timings:{
        type:Object,
        required:true,
    }
},
{timestamps:true},//Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true.
)


const doctorModel = mongoose.model("doctors",doctorSchema);
module.exports =doctorModel;
















