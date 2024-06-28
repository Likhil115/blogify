const express=require("express")
const router=express.Router();
const user=require("../models/user")
const Blog=require("../models/blog")

router.get("/",async(req,res)=>{
    
   
        const allBlogs=await Blog.find({});

    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})




module.exports=router;