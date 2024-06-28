const mongoose=require("mongoose");
const {createHmac,randomBytes}=require("crypto");
const jwt=require("jsonwebtoken");
const {setUser}=require("../services/user")
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:"/images/default.jpg"
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER",
    }



},{timestamps:true});


userschema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")) return;
    const salt=randomBytes(16).toString();
    
    const hashedpassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
    
    user.salt=salt;
    user.password=hashedpassword;
next();
})

userschema.static("matchpasswordandreturntoken",async function(email,password){
    const User=await this.findOne({email});

    if(!User){
        return res.redirect("/user/signup");
    }

    const hashedpassword=createHmac("sha256",User.salt)
    .update(password)
    .digest("hex");

    if(hashedpassword!==User.password){
         throw new Error("Incorrect password");
    }

    const token= setUser(User);
    return token;
   
})


const user=mongoose.model("user",userschema);

module.exports=user;
