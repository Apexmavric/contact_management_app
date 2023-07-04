const mongoose = require("mongoose");
const contactschema = mongoose.Schema({
    user_id:{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required: [true,"Please Add Contact Name"],
    },
    email:{
        type:String,
        required:[true,"Please Add Email Address"],
    },
    phone:{
        type:String,
        required:[true,"Please Add phone number"],
    }
    },
    {
        timestamps:true,
    }  
);
module.exports = mongoose.model("Contact",contactschema);