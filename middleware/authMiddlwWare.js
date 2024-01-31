const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
   try {

    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(200).send({
                message:"Auth failed",
                success:false

            })
        
        }else{
            //decoding user ID______
            req.body.userId=decode.id;    // 71 line me hamne id  pass kiya tha use decode kar arha hu
            next();
        }
    })
    
   } catch (error) {
    console.log("Error in Authentication");
    console.log(error);
    res.status(401).send({
        message:"Authentication failed",
        success: false

    })
    
   }

}














