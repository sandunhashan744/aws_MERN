import subscribeChannels from "../models/SubscribeChannels.js";
import axios from "axios";
import dotenv from 'dotenv';
//import { response } from "express";
dotenv.config();

// create trader
export async function createTrader(req, res){
    //console.log('first')
    const {account, email, channelName, channelId} = req.body;
    
    const data = {
        accountID : account,
        accountName : email,
        email,
        platform: 'MT4',
        tenant: "default",
        supportReal: true,
    }

    try {
        axios.post('http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user', data)
        .then(response => {
            //console.log(response)
            if(response.data){
                const subscribe = new subscribeChannels({
                    userId : email, 
                    traderAccount : account, //trader-account
                    channelId,
                    channelName 
                });
                console.log(subscribe)
                // save the
                subscribe.save()
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

// get all channels by using User
export async function getSubscribeChannel(req, res){
    const {email} = req.params;
    try {
        if(!email) return res.status(501).send({error: "Invalied email"});
     
        const channel = await subscribeChannels.find({userId : email});

        return res.status(201).send(channel);
        
    } catch (error) {
        return res.status(404).send(error);
    }
}
