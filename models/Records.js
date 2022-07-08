const mongoose=require("mongoose")                       
const{Schema}=mongoose

const recordSchema=new Schema({
    nameOfCandidate:{
        type:String
    },
    email:{
        type:String
    },
    MobileNo:{
        type:String
    },
    DateofBirth:{
        type:String
    },
    WorkExperience:{
        type:String
    },
    ResumeTitle:{
        type:String
    }
    ,
    CurrentLocation:{
    type:String
    },
    PostalAddress:{
    type:String
    },
    CurrentEmployer:{
    type:String
    },
    CurrentDesignation:{
        type:String
    }
});

module.exports=new mongoose.model("Records",recordSchema)
