import { Router } from "express";
import * as controller from '../controllers/appcontroller.js';
import Auth,{localVariables} from "../middleware/auth.js";
// import mailler
import {registerMail} from '../controllers/mailler.js'

// ************************************************************************

//import Channels
import * as channelController from '../controllers/channelController.js';
//import Trader
import * as traderController from '../controllers/traderController.js';
// import Administrator
import * as adminController from '../controllers/adminController.js';
// import SuperUser
import * as superUserController from '../controllers/superUserController.js';

// insert table data
import * as insertData  from "../controllers/insertData.js";

//permission controller
//import * as PermissionController from "../controllers/PermissionController.js"

const router = Router();

// POST End points
router.route('/register').post(controller.register); //register User
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);

// GET End points
router.route('/getUser/:email').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

// PUT End Points
router.route('/updateUser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetpassword);

//--------------------------------------------------------------------------------

// ****************** Channels ******************
router.route('/create-channel').post(channelController.createChannel); //Create

router.route('/channels').get(channelController.getChannels); //get all

router.route('/channels/:email').get(channelController.getChannelsByUser);

router.route('/channel/:id').delete(channelController.deleteChannel);

router.route('/channel/:id').get(channelController.getChannelById);

// //get the subscribed channels
// router.route('/subscibed/:email').get(channelController.subscribedChannels);

// ****************** Trader ******************
router.route('/create-trader').post(traderController.createTrader);

router.route('/trader/:email').get(traderController.getSubscribeChannel); //get subscribe channels

//unsubscribe the channel
router.route('/unsubscribe/:chanels/:email').delete(traderController.unsubscribeChannel);


// ****************** Administrator ******************
router.route('/admin/channel').get(adminController.getAllChannels); //load all channel

router.route('/admin/subscriber').get(adminController.getAllSubscribers); //load all sunscriber

router.route('/admin/subscriber/:channels').get(adminController.getChannelSubs); //all subscriber of channel

router.route('/admin/subscriber').delete(adminController.removeSubscriber); //Delete subscriber 


// ****************** SuperUser ******************

router.route('/superUser').get(superUserController.getAllUser); //get All Users 

router.route('/superUser/:email').get(superUserController.getUserDetails); //get User details 

router.route('/superUser').put(superUserController.updateUserRole); //get User details 

router.route('/userRoles').get(superUserController.getUserRole); //get User details 


// this is only insert the Permission and roles
router.route('/insertPerm').post(insertData.insertPermission); //insert user permission
router.route('/removePerm').delete(insertData.removePermissions); //remove all permissions
router.route('/insertRole').post(insertData.insertRoles); //insert user roles
router.route('/removeRole').delete(insertData.removeRoles); //insert user roles


// //to get the permissions
// router.route('/permissions/:role').get(PermissionController.getPermissions);

// //load the web page permissions
// router.route('/pagePermission/:entity').get(PermissionController.pagePermission);


export default router;