// const jwt=require("jsonwebtoken");
const {getUser}=require("../services/user");

function auth(req,res,next){
    
    const token=req.cookies?.uid;
    
    req.user=null;
    if(!token){
        return next();
    }
   
    const user=getUser(token);
    req.user=user;
    return next();
}


module.exports=auth;