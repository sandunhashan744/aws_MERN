import userAccounts from "../models/userAccounts.js";
import axios from "axios";
import dotenv from 'dotenv';
import { response } from "express";
dotenv.config()

// create a channel
export async function createChannel(req, res){
    // console.log(req.body)
    const { channelName, source, accountID, email} = req.body;
    //console.log(email)
    const data = {
        accountID,
        accountName: email,
        platform: source,
        tenant: "default",
        channelName, 
        supportSignal : true,
        logo: "base64 format",
    };

    //  console.log(data)
    try {
        axios.post('http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/master', data)
        .then(response => {
            console.log(response)
            if(response.data){
                const user = new userAccounts({
                    userId : email, 
                    account : accountID, 
                    channelName
                });
                
                // save the
                user.save()
                .then(() => res.status(201).send({msg:'Successfully Saved'}))
                .catch(() => res.status(500).send({error : 'Error'})) 
            }
            else{
                return res.status(202).send({'msg' : 'error'});
                }
        })
        .catch(error => {
            return res.status(404).send(error);
        });

    } catch (error) {
        return res.status(404).send(error);
    }
}

// get all channels 
export async function getChannels(req, res){
   // console.log('1111111111')
    try {
        const channel = await userAccounts.find({});
        return res.status(201).send(channel);
    } catch (error) {
        return res.status(404).send(error);
    }
}

// get all channels by using User
export async function getChannelsByUser(req, res){
    const {email} = req.params;
    try {
        if(!email) return res.status(501).send({error: "Invalied email"});
     
        const channel = await userAccounts.find({userId : email});

        return res.status(201).send(channel);
        
    } catch (error) {
        return res.status(404).send(error);
    }
}

// delete Channel 
export async function deleteChannel(req, res){
    const { id } = req.params;

    try {
        axios.delete(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/master/${id}`)
        .then(() => {
            userAccounts.deleteOne({account : id})
            .then(result => res.status(201).send({msg:'Successfully Deleted'}))
            .catch(error => res.status(500).send({error : 'Error'}))
        })
        .catch(error => res.status(500).send({error : 'Error'}))

    } catch (error) {
        return res.status(404).send(error)
    }
}

//get channel by User
export async function getChannelById(req, res){
    const { id } = req.params;
    
    try {
        const { data } = await axios.get(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/master/${id}`)
        return res.status(201).send(data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).send(error.message)
        }
        return res.status(500).send(error.message)
    }
}