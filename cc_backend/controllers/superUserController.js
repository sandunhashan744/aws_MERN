import Usermodel from "../models/Usermodel.js";
import Roles from "../models/Roles.js";
// import axios from "axios";
// import { response } from "express";

//get all channels  
export async function getAllUser(req, res){
    
    try {
        //const users = await Usermodel.distinct("email");
        const users = await Usermodel.distinct("email", { userRoles: { $ne: 4 } });
       //    console.log(users)
        return res.status(201).send(users);
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

// get the all subscribers on a channel
export async function getUserDetails(req, res){

    const {email} = req.params;
    
    try {
        const userDetails = await Usermodel.find({email : email})
        //console.log(userDetails)
        return res.status(202).send(userDetails)

    } catch (error) {
        return res.status(404).send(error)
    }
}

// get the all subscribers on a channel
export async function updateUserRole(req, res){

    const { selectedUserRole, email } = req.body;
    
    try {
        const updatedUser = await Usermodel.findOneAndUpdate(
            { email: email },
            { userRoles: selectedUserRole }
        );

        return res.status(202).send(updatedUser);

    } catch (error) {
        return res.status(404).send(error)
    }
}

//load all userRoles
export async function getUserRole(req, res){
    
    try {
        const userRoles = await Roles.find({ roleName: { $ne: 'SuperUser' } });
        //console.log(userRoles)
        return res.status(202).send(userRoles)

    } catch (error) {
        return res.status(404).send(error)
    }
}
