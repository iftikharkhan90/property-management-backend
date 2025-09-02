const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    dailyIncome:{type:Number,required:true},
    reciveIncome:{type:Number,required:true},
    type:{type:String,default:"user"}
}, {
    timestamps: true 
})
module.exports= mongoose.model("users",userSchema)