const express=require("express")
const app=express()
const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/candidates_record')
.then(()=>{
    console.log("Database connected")
})
.catch((e)=>{
    console.log(e)
})
const ejs=require("ejs")
const ejsMate=require("ejs-mate")
const path=require("path")
const session=require("express-session")
const flash=require("connect-flash")
const router=require("./controllers/upload")
//----------------------------------------------------------------------------------//
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.use(express.static(__dirname+"/public"))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"thisissecret",
    resave:false,
    savUinitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
    }
}))

app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    next()
})
//----------------------------------------------------------------------------------//
app.use("/",router)

app.listen("3000",()=>{
    console.log("Connected to LocalHost 3000")
})


