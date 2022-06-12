const jwt=require("jsonwebtoken")
const userModel=require("../../db/models/user.model")
const auth=async(req,res,next)=>{
    try{
        const token=req.header("Authorization").replace("bearer ","")
        const id=jwt.verify(token,"12")
        const user=await userModel.findOne({"_id":id._id,"tokens.token":token})
        if(!user) throw new Error("user not found")
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            message:"unauthorized",
            data:e.message
        })
    }
}
module.exports=auth