import React,{ useEffect, useState } from 'react'
import FetchChannel from '../../authModule/hook/featch-subscribeChannel';

const SubscribeChannel = ({subscribe, onChannelSelect}) => {

    useEffect(() => {
        refetch();
    }, [subscribe]);
    
    const [selectedRow, setSelectedRow] = useState(null);

   // load data from DB
   const [{ isLoading, apiData, serverError }, refetch] = FetchChannel();


   //get channel by id
   function getChannel(id){
    onChannelSelect(id)

   }
   //selct row
   const handleRowClick = (channel) => {
    setSelectedRow(channel._id);
    //getChannel(channel.account);
  };

    return (
    <div className='bg-slate-100 px-10 rounded-xl shadow-2xl row-span-2'>
        <div className='flex justify-center items-center'>
            <h2 className='md:text-xl text-lg font-bold text-black my-2 text-center'>Subscribe List</h2>
        </div>
        <div className="overflow-x-auto pt-2 pb-10">
            <table className="table-auto w-full ">
                <tbody className='bg-transparent justify-center'>
                    {apiData?.map(channel => (
                    <tr 
                    key={channel._id} 
                    onClick={() => {
                        getChannel(channel.channelId);
                        handleRowClick(channel);
                    }}
                    className={`border-y px-4 border-slate-500 cursor-pointer hover:bg-slate-300 ${
                        selectedRow === channel._id ? 'bg-slate-200' : ''
                      }`}>
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