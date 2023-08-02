import mongoose from "mongoose";

export const userAccountSchema = new mongoose.Schema({
   
    userId : {
        type : String,
        required : [true, "Please Provide the First Name"]
    },
    account : {
        type : String,
        unique : true
    },
    channelName : {
        type : String,          
    },
    logo : {
        type : String 
    }
});

export default mongoose.model.accounts || mongoose.model('accounts', userAccountSchema)
