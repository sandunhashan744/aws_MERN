import mongoose from "mongoose";

export const subscribeSchema = new mongoose.Schema({
   
    userId : {
        type : String,
        required : [true, "Please Provide the First Name"],
        unique : false
    },
    traderAccount : {
        type : String,
        unique : false
    },
    channelId : {
        type : String,
        unique : false
    },
    channelName : {
        type : String,          
    }
});

export default mongoose.model.subscribeChannels || mongoose.model('subscribeChannels', subscribeSchema)
