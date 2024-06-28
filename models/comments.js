const mongoose=require("mongoose");

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        requied:true,
    },
    blogid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",

    }

},{Timestamps:true})


const Comment=mongoose.model("comment",commentSchema);
module.exports=Comment;