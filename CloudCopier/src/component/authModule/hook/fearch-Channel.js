import { useEffect, useState } from "react";
import { getuserName } from '../helper/helper'
import axiosInstance from '../helper/axios-url'

const axios = axiosInstance;

/** custom hook */
export default function useFetch(){
    const [getData, setData] = useState({ isLoading : false, apiData: null, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { username } = await getuserName();
                
                setData(prev => ({ ...prev, isLoading: true}));
                
                const { data, status } =  await axios.get(`/api/channels/${username}`);
                //console.log(status)
                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
                
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };

        fetchData()

    }, []);

    // Define refetch function here
    const refetch = async () => {
        try {
            const { username } = await getuserName();
            setData(prev => ({ ...prev, isLoading: true}));
            const { data, status } =  await axios.get(`/api/channels/${username}`);
            
            if(status === 201){
                setData(prev => ({ ...prev, isLoading: false, apiData : data, status: status }));
            }
            setData(prev => ({ ...prev, isLoading: false}));
        } catch (error) {
            setData(prev => ({ ...prev, isLoading: false, serverError: error }))
        }
    };

    return [getData, refetch];
    
}