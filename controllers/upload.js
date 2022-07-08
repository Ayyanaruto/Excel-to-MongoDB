const express=require("express")
const router=express.Router()
const excelToJson =require("convert-excel-to-json")
const multer=require("multer")
const upload = multer({ dest: 'uploads/' })
const asyncs=require("async")
const Records=require("../models/Records")



router.get("/",(req,res)=>{
    res.render("index")
})

router.post("/",upload.single("excel"), async(req,res)=>{
    const result = excelToJson({
        sourceFile: req.file.path,
        columnToKey: {
            A:"nameOfCandidate",
            B:"email",
            C:"MobileNo",
            D:"DateofBirth",
            E:"WorkExperience",
            F:"ResumeTitle",
            G:"CurrentLocation",
            H:"PostalAddress",
            I:"CurrentEmployer",
            J:"CurrentDesignation"
        
        }
    });
   const data =result.Sheet1
  asyncs.eachSeries(data,(output,callback)=>{
    // process(output,callback)
  validating(output,callback)
  },function(err){
    if(!err){
        req.flash("success","Successfully submitted")
        res.redirect("/")
    }
  })
})


const validating=(data,callback)=>{
    Records.replaceOne({email:data.email},data,{ upsert:true, new:true }, (err, base) => {
        if (err) {
            console.log(err);
        }
      
        console.log(base)
        callback()
    });

}
module.exports=router