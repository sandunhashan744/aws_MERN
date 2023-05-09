import jwtDecode from "jwt-decode";
import axiosInstance from './axios-url'

//Rename the axiosInstance As axios
const axios = axiosInstance;

// *** Make a API Request ***

//get userName from Token
export async function getuserName(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cann't have a Token");
    let decode = jwtDecode(token);
    return decode;
}

// Authentication Function
export async function authenticate(email){

    try {
        return await axios.post('/api/authenticate', {email})
    } catch (error) {
        return {error: "Username doesn't exist"}
    }

}

// Get User deatails
export async function getUser({email}){
    
    try {
        const { data } = await axios.get(`/api/getUser/${email}`);
        return {data};

    } catch (error) {
        return {error:"Email not matched", status:404}
    }

}

// Register the User 
export async function registerUser(credentials){

    //console.log(credentials)
    
    try {
        const {data : { msg }, status} = await axios.post(`/api/register`, credentials);
        
        let {firstName, email} = credentials;

        //send e-mail to the user
        if(status === 201){
            await axios.post(`/api/registerMail`, {firstName, email, text : msg})
        }

        return Promise.resolve(msg);

    } catch (error) {
       // console.log(error.response.data)
        return Promise.reject(error.response.data);
    }
}

// user login
export async function login({email, password}){
    try {
        if(email){
            const { data } = await axios.post('/api/login', {email, password});
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "email or Password doesn't Match..!"})
    }
}

// update user function
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
       // console.log(response)
        const data = await axios.put('/api/updateUser', response, {headers : {"Authorization" : `Bearer ${token}`}});
        
        return Promise.resolve({ data });

    } catch (error) {
        return Promise.reject({error : "Couldn't Update the User..!"})
    }
}

// generate OTP
export async function generateOTP(email){
   
    try {
        const { data : { code } , status} = await axios.get('/api/generateOTP', {params : { email }});

        // send mail with OTP
        if(status === 201){
            
            //call to get user Function
            let  { data : {firstName,lastName} }   = await getUser({email});
            let username = firstName +' '+ lastName 
            //console.log(username)

            let text = `Your Password Recovery OTP is ${code}. Verify and recover Your Password..!`;
            
            await axios.post(`/api/registerMail`, {username, email, text, subject:"Password Recovery OTP"})
        }
        
        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error});
    }
}

// verify the OTP
export async function verifyOTP({email, code}){
   // console.log(email);
    try {
        const { data, status } = await axios.get('/api/verifyOTP', {params : { email, code }});
        return {data, status}
    } catch (error) {
        return Promise.reject({error});
    }
}

// reset the Password
export async function resetPass({email, password}){
    
    try {
        const {data, status} = await axios.put('/api/resetPassword', {email, password});
        return Promise.resolve({ data, status });

    } catch (error) {
        return Promise.reject({error})
    } 
}

// ********************** new ********************

//get the users from db
export async function getSubscriber(){
    
    try {
        const { data } = await axios.get(`/api/subscriber`);
       // console.log(data)
        return {data};

    } catch (error) {
        return {error:"Email not matched", status:404}
    }
}

//get the Providers from db
export async function getProviders(){
    
    try {
        const { data } = await axios.get(`/api/provider`);
       // console.log(data)
        return {data};

    } catch (error) {
        return {error:"Providers are empty", status:404}
    }

}

// update provider function
export async function updateProvider(response){
    try {
        const token = await localStorage.getItem('token');
     // console.log(token)
        const data = await axios.put('/api/provider-update', response, {headers : {"Authorization" : `Bearer ${token}`}});
       
        return Promise.resolve({ data });
        //console.log(data)

    } catch (error) {
        return Promise.reject({error : "Couldn't Update the Provider..!"})
    }
}

export async function updateSubscriber(response){
    try {
        const token = await localStorage.getItem('token');
     
        const data = await axios.put('/api/subscriber-update', response, {headers : {"Authorization" : `Bearer ${token}`}});
       
        return Promise.resolve({ data });
        //console.log(data)

    } catch (error) {
        return Promise.reject({error : "Couldn't Update the Subscriber..!"})
    }
}

// create channel
export async function createChannel(credentials){

    try {
        const {data : { msg }, status} = await axios.post(`/api/create-channel`, credentials);

        return Promise.resolve(msg ,status);
        
    } catch (error) {
        return Promise.reject({error : "Couldn't Update the Subscriber..!"})
    }
}

//get all Chanels
export async function getChannels(){
    try {
        const { data } = await axios.get(`/api/channels`);
        //console.log(data)
        return {data};

    } catch (error) {
        
        return {error, status:404}
    }
}

//get channelById
export async function getChannelById(id){
   // console.log(id)
    try {
        const { data } = await axios.get(`api/channel/${id}`);
        //console.log(data)
        return {data};

    } catch (error) {
        
        return {error, status:404}
    }
}

//delete Channel
export async function deleteChannel(id){

    try {
        
        const { data, status } = await axios.delete(`/api/channel/${id}`);
        
        return {data, status};
        
    } catch (error) {
        return {error, status: 404}
    }
}

// create trader
export async function createTrader(credentials){

    //console.log(credentials)

    try {
        const {data : { msg }, status} = await axios.post(`/api/create-trader`, credentials);

        return Promise.resolve(msg ,status);
        
    } catch (error) {
        return Promise.reject({error : "Couldn't Update the Subscriber..!"})
    }
}