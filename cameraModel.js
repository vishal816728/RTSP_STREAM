const mongoose=require("mongoose")

const cameraSchema=new mongoose.Schema({
    camURL:{
        type:String
    },
    cameraName:{
        type:String
    },
    logPath:{
        type:String
    },
    status: {
        type:String,
        default:"Active"
    },
    analyticalMode:{
        type:String,
        default:"Analytical"
    },
    streamURL:{
        type:String,
        default:"NA"
    },
    reason: {
        type:String
    },
    camMode:{
        type:String,
        default:"ON"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Camera",cameraSchema)