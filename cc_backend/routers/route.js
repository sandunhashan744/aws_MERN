import { Router } from "express";
import * as controller from '../controllers/appcontroller.js';
import Auth,{localVariables} from "../middleware/auth.js";
// import mailler
import {registerMail} from '../controllers/mailler.js'

// ****************************************
//import Channels
import * as channelController from '../controllers/channelController.js';
//import Trader
import * as traderController from '../controllers/traderController.js';

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

//*************************************** */

// ******** Channels ***********
router.route('/create-channel').post(channelController.createChannel); //Create

router.route('/channels').get(channelController.getChannels); //get all

router.route('/channels/:email').get(channelController.getChannelsByUser);

router.route('/channel/:id').delete(channelController.deleteChannel);

router.route('/channel/:id').get(channelController.getChannelById);

// ********* Trader *************
router.route('/create-trader').post(traderController.createTrader);

router.route('/trader/:email').get(traderController.getSubscribeChannel); //get subscribe channels

export default router;