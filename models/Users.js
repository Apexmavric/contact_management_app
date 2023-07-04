const mongoose = require("mongoose");
const Userschema = mongoose.Schema({
    username:{
        type:String,
        required: [true,"Please Add your Username"],
    },
    email:{
        type:String,
        required:[true,"Please Add Email Address"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    }
    },
    {
        timestamps:true,
    }  
);
module.exports = mongoose.model("User",Userschema);