const express=require("express")
const router=express.Router();
const user=require("../models/user")
const {createHmac}=require("crypto");
const {setUser}=require("../services/user")

router.post("/signup",async(req,res)=>{
    
    const {name,email,password}=req.body;
    if(!email || !name || !password){
        res.status(404).send("All fields requierd");
    }

    const User=await user.create({
        name,email,password,
    });
    
    res.redirect("/");
});

router.post("/signin",async(req,res)=>{
    
    const {email,password}=req.body;
   

   try { const token=await user.matchpasswordandreturntoken(email,password);
    res.cookie("uid",token);
    return res.redirect("/");}
    catch(error){
        
        return res.render("signin",{
            error:"Incorrect email or password",
        });
    }

});

router.get("/signout",(req,res)=>{
   req.user=null;
   res.clearCookie("uid");
   return res.redirect("/");

})


router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    
    return res.render("signup");
})



module.exports=router;