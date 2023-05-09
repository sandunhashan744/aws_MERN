import React,{ useEffect } from 'react'
import FetchChannel from '../../authModule/hook/featch-subscribeChannel';

const SubscribeChannel = ({subscribe, onChannelSelect}) => {

    useEffect(() => {
        refetch();
    }, [subscribe]);
    
   // load data from DB
   const [{ isLoading, apiData, serverError }, refetch] = FetchChannel();

   //get channel by id
   function getChannel(id){
    onChannelSelect(id)

   }

    return (
    <div className='bg-transparent px-10 rounded-xl shadow-2xl row-span-2'>
        <div className='flex justify-center items-center'>
            <h2 className='md:text-xl text-lg font-bold text-slate-400 my-2'>Subscribe List</h2>
        </div>
        <div className="overflow-x-auto pt-2 pb-10">
            <table className="table-auto w-full ">
                <tbody className='bg-transparent justify-center text-slate-400'>
                    {apiData?.map(channel => (
                    <tr 
                    key={channel._id} 
                    onClick={() => getChannel(channel.channelId)}
                    className="border-y px-4 border-slate-400 cursor-pointer hover:bg-slate-800">
                        <td className="px-6 py-2 text-center">{channel.channelName}</td>
                    </tr>
                    ))}
                   
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SubscribeChannel