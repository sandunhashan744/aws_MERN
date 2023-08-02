import userAccounts from "../models/userAccounts.js";
import SubscribeChannels from "../models/SubscribeChannels.js";
import axios from "axios";
import { response } from "express";

//get all channels
export async function getAllChannels(req, res){
    
    try {
        const channels = await SubscribeChannels.distinct("channelName");
        return res.status(201).send(channels);
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

// get the all subscribers on a channel
export async function getChannelSubs(req, res){

    const {channels} = req.params;
    
    //console.log(channels)
    try {
        const subscriber = await SubscribeChannels.find({channelName : channels})
        //console.log(subscriber)
        return res.status(202).send(subscriber)

    } catch (error) {
        return res.status(404).send(error)
    }
}

//get all subsbriber
export async function getAllSubscribers(req, res){
    try {
        const allSubs = await SubscribeChannels.find({});
        return res.status(201).send(allSubs);
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

//to rmove the Subscriber
export async function removeSubscriber(req, res){
 //   console.log('first')
    const selectedRowDetails = req.body;
    
   // console.log(selectedRowDetails)
   for (const entry of selectedRowDetails) {
    const channelName = entry.channelName;
    const traderAccount = entry.traderAccount;

    try {
        console.log(traderAccount, channelName)
        await axios.get(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/master/${traderAccount}`)
        .then((response) =>{
            const existingChannels = response.data.client;
            //console.log(existingChannels)

            if(existingChannels){

                const updatedChannels = existingChannels.channels.filter((channel) => {
                    return channel !== channelName;
                });
               // console.log('Updated channels:', updatedChannels);
              existingChannels.channels = updatedChannels;

              //console.log(existingChannels.channels)

                // Make the HTTP PUT request to update the channel array
                axios.put(`http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/admin/master/${traderAccount}`,existingChannels)
                .then(updatedUser => {
                    // console.log(updatedUser.data)
                    // console.log('Successfully Removed..!')

                    if(updatedUser){
                        SubscribeChannels.deleteOne({ $and: [{ traderAccount: traderAccount }, { channelName: channelName }] })
                        .then(deletedRecord => {
                            console.log('Record deleted:', deletedRecord);
                            return res.status(201).send({ msg:'Success Fully Deleted..!'});
                          })
                        .catch(error => {
                        console.log('Error deleting record:', error);
                        });
                    }
  
                })
                .catch((error) =>{
                    console.log(error)
                })
             
            }else{
                console.log('there is no any channel')
            }

        })
    } catch (error) {
        console.log(error)  
    }

   }

}