import React,{ useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri';
import FetchChannel from '../../authModule/hook/fearch-Channel';

import { deleteChannel } from '../../authModule/helper/helper';
import toast from 'react-hot-toast';

const ChannelList = ({channels, onChannelSelect }) => {

    useEffect(() => {
        refetch();
    }, [channels]);
      
    // load data from DB
    const [{ isLoading, apiData, serverError }, refetch] = FetchChannel();

    // delete channel function
    function delChannel (id) {
        deleteChannel(id)
        .then(response => {
            toast.success(<b>{'Channel Deleted 🙂'}</b>);
            refetch();
          })
          .catch(error => {
            // show error toast notification
            toast.error(<b>{'Channel Not Deleted 😟'}</b>);
            console.error('Error deleting channel:', error);
          });
    }
    
    // get channel function
    function getChannel(id) {
        onChannelSelect(id)
    }
    
    return (
        <div className='bg-transparent md:px-16 px-5 rounded-xl shadow-2xl row-span-2'>
            <div className='flex justify-center items-center'>
                <h2 className='md:text-xl text-lg font-bold text-slate-400 my-2'>Channel List</h2>
            </div>

        {isLoading ? (
            <p>Loading...</p>
            ) : serverError ? (
                <p>Error: {serverError.message}</p>
            ) : (
                <div className="overflow-x-auto pt-2 pb-10">
                    <table className="table-auto w-full ">
                    <thead className='bg-transparent'>
                        <tr className="text-slate-300">
                        <th className="px-4 py-2 text-left text-sm font-bold ">Account</th>
                        <th className="px-4 py-2 text-left text-sm font-bold ">Channel</th>
                        <th className="px-4 py-2 text-left text-sm font-bold ">Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-transparent justify-center text-slate-400'>
                        {apiData?.map(channel => (
                        <tr 
                        key={channel._id} 
                        onClick={() => getChannel(channel.account)}
                        className="border-y px-4 border-slate-400 cursor-pointer hover:bg-slate-800">
                            <td className="px-6 py-2 text-left">{channel.account}</td>
                            <td className="px-6 py-2 text-left">{channel.channelName}</td>
                            <td className="px-6 py-2 text-left" 
                                onClick={() => delChannel(channel.account)} >
                                {<RiDeleteBin5Line size={20} className='cursor-pointer ' />}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            )}
            </div>
            )
        }

export default ChannelList