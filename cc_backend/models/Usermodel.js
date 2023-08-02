import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
   
    firstName : {
        type : String,
        required : [true, "Please Provide the First Name"]
    },
    lastName : {
        type : String,
        required : [true, "Please Provide the Last Name"],
    },
    telegram : {
        type : Number,
        default : 0           
    },
    email : {
        type : String,
        required : [true, "Please Provide the Unique email"],
        unique : true
    },
    metaTrade : {
        type : String,
        default : ''
    },
    password : {
        type: String,
        required : [true, "Please Provide a Password"],
        unique : false
    },
    profile : {
        type : String
    },
    userRoles : {
        type : Number,
        //default : 1
    }
});

export default mongoose.model.users || mongoose.model('users', UserSchema)
