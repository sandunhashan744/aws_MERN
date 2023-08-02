import subscribeChannels from "../models/SubscribeChannels.js";
import axios from "axios";
import dotenv from 'dotenv';
//import { response } from "express";
dotenv.config();

// create trader
export async function createTrader(req, res){
    //console.log('first')
    const {account, email, channelName, channelId} = req.body;

    //channel array
    const channel = [channelName];
   // console.log(account)
    const data = {
        accountID : account,
        accountName : email,
        email,
        platform: 'MT4',
        tenant: "default",
        supportReal: true,
        channels: channel
    }

    try {
       // subscribeChannels.findOne({ $and: [{ channelName: channelName }, { userId: email }] })
       axios.get(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user/${account}`) 
       .then( exsistingUser =>{
     //   console.log(exsistingUser.data.client)
            if(exsistingUser.data.client !== null){
                
                const channels = exsistingUser.data.client.channels;

                if (!channels.includes(channelName)) {
                    channels.push(channelName);
                    // Update the channels array in the user data
                    exsistingUser.data.client.channels = channels; 
                }

                console.log(exsistingUser.data);
                axios.put(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user/${account}`, exsistingUser.data.client)
               // axios.put(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user/${account}`, exsistingUser.data)
                .then(response => {
                    console.log(response.data);

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
                    return res.status(500).send({ error: 'Error occurred during PUT request' });
                });
            }
            else{
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
            }
        })

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

//unsubscribe the channel
export async function unsubscribeChannel(req, res){
    const {email, chanels} = req.params;

    try {
        await subscribeChannels.findOne({ $and: [{ userId: email }, { channelName: chanels }] })
        .then(subscribed => {
          if (subscribed) {
            // console.log(subscribed.traderAccount);
            let trader = subscribed.traderAccount;

            axios.get(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user/${trader}`) 
            .then( existingUser =>{
                // console.log(existingUser)
                const existingChannels = existingUser.data.client.channels;
                // console.log('avilble = '+existingChannels)
                const filteredChannels = existingChannels.filter(channel => !chanels.includes(channel));
      
                // console.log('chanels = '+filteredChannels);

                 // Update the channel array
                existingUser.data.client.channels = filteredChannels;

                // Make the HTTP PUT request to update the channel array
                axios.put(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/user/${trader}`, existingUser.data.client)
                .then(updatedUser => {
                   // console.log('User updated:', updatedUser);

                    if(updatedUser){
                        subscribeChannels.deleteOne({ $and: [{ userId: email }, { channelName: chanels }] })
                        .then(deletedRecord => {
                            console.log('Record deleted:', deletedRecord);
                            
                          })
                          .catch(error => {
                            console.log('Error deleting record:', error);
                          });
                    }  
                })
                .catch(error => {
                    console.log('Error updating user:', error);
                });
            })
            .catch(error => {
                console.log('Error updating user:', error);
            });

          } else {
            console.log('No matching subscription found.');
          }
        })

    } catch (error) {
        return res.status(404).send(error)
    }
}