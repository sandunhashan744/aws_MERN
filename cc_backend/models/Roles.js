import mongoose from "mongoose";

export const userRoleSchema = new mongoose.Schema({
   
    roleId : {
        type : Number,
        unique : true
    },
    roleName : {
        type : String,
    },
    permission : {
        type : [String],
    }
});

export default mongoose.model.roles || mongoose.model('roles', userRoleSchema)
