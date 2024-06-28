require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
const cookieParser = require("cookie-parser");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');


const userroute=require("./routes/user");
const homeroute=require("./routes/home");
const blogroute=require("./routes/blog")


const auth=require("./midllewares/authenticate");
// const authenticatehome=require("./midllewares/authenticatehome");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

const port=process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(auth);
app.use(express.static(path.resolve("./public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/",homeroute);

app.use("/user",userroute);
app.use("/blogs",blogroute);

app.listen(3000,()=>{
    console.log(`listening at ${port}`);
})
