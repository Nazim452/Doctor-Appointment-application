const mongoose = require('mongoose');

const color = require('colors');
const connectDB = async()=>{
    try {
        await  mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDb connected ${mongoose.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.log("Error While Connecting with MongoDB");
        console.log(error);
        
    }
}


module.exports =connectDB;















