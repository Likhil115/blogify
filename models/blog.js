const mongoose=require("mongoose");

const blogschema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    
    },
    body:{
        type:String,
        required:true,
    
    },
    imageurl:{
        type:String,
        required:true,
    
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

},{timestamps:true});

const Blog=mongoose.model("blog",blogschema);
module.exports=Blog;