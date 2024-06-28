const express=require("express");
const router=express.Router();
const blog=require("../models/blog")
const multer = require('multer');
const path=require('path')
const comment=require("../models/comments")

router.get("/add-new",(req,res)=>{
  if(req.user!=null){
    res.render("addblog",{
        user:req.user,
    })}
    else{
      res.render("signin");
    }
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });


const upload = multer({ storage: storage });

router.post("/add-new", upload.single('image'),async(req,res)=>{

    const {title,blogbody}=req.body;
    const image=req.file;
    console.log(image);

    const imageUrl = `/uploads/${image.filename}`;
    console.log(imageUrl);

    const Blog=await blog.create({
        title:title,
        body:blogbody,
        createdby:req.user._id,
        imageurl:imageUrl,
    });
    
    res.redirect("/");
})


router.get("/:id",async(req,res)=>{
    const Blog=await blog.findById(req.params.id).populate("createdby");
    const Comment=await comment.find({blogid:req.params.id}).populate("createdby");
    res.render("blog",{
      user:req.user,
      Blog,  
      Comment,
    })

})


router.post("/comments/:blogid",async(req,res)=>{
  const co=await comment.create({
    content:req.body.content,
    blogid:req.params.blogid,
    createdby:req.user._id,

  })

  res.redirect(`/blogs/${req.params.blogid}`);
  
})


module.exports=router;