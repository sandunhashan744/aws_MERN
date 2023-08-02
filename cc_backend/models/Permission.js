import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment";

export const userPermissionSchema = new mongoose.Schema({
   
    pemCode : {
        type : String,
        unique : true,
    },
    permission : {
        type : String,
    },
    entity : {
        type : String,
        required : false
    },
    action : {
        type : String,
    }
});

export default mongoose.model.permission || mongoose.model('permission', userPermissionSchema)
