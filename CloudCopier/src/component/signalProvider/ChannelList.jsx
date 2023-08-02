import React,{ useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri';
import FetchChannel from '../authModule/hook/fearch-Channel';

import { channelDelete } from '../authModule/helper/helper';
import toast from 'react-hot-toast';

const ChannelList = ({channels, onChannelSelect, deleteChannel }) => {

    useEffect(() => {
        refetch();
    }, [channels]);
      
    // load data from DB
    const [{ isLoading, apiData, serverError }, refetch] = FetchChannel();

    const [selectedRow, setSelectedRow] = useState(null);

    // delete channel function
    function DelChannel (id) {
        console.log('delete' + id)
        channelDelete(id)
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
    //selct row
    const handleRowClick = (channel) => {
      setSelectedRow(channel._id);
      //getChannel(channel.account);
    };
    
    return (
        <div className='bg-slate-100 px-5 rounded-xl shadow-2xl row-span-2'>
            <div className='flex justify-center items-center'>
                <h2 className='md:text-xl text-lg font-bold my-2'>Channel List</h2>
            </div>

        {isLoading ? (
            <p className='flex justify-center'>Loading...</p>
            ) : serverError ? (
                <p>Error: {serverError.message}</p>
            ) : (
                <div className="overflow-x-auto pt-2 pb-8">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="text-slate-900">
                            <th className="px-4 py-2 text-left text-sm font-bold ">Account</th>
                            <th className="px-4 py-2 text-left text-sm font-bold ">Channel</th>
                            {deleteChannel ? (
                            <th className="px-4 py-2 text-left text-sm font-bold ">Action</th>
                            ) : null}
                            </tr>
                        </thead>
                        <tbody className='bg-transparent justify-center '>
                            {apiData?.map(channel => (
                            <tr 
                            key={channel._id} 
                            onClick={() => {
                                getChannel(channel.account);
                                handleRowClick(channel);
                            }}
                            className={`border-y px-4 border-slate-500 cursor-pointer hover:bg-slate-300 ${
                                selectedRow === channel._id ? 'bg-slate-200' : ''
                            }`}>
    
                                <td className="px-6 py-2 text-left">{channel.account}</td>
                                <td className="px-6 py-2 text-left">{channel.channelName}</td>
                                {deleteChannel ? (
                                <td className="px-6 py-2 text-left" 
                                    onClick={() => DelChannel(channel.account)} >
                                    {<RiDeleteBin5Line size={20} className='cursor-pointer z-20'  />}
                                </td>
                                ) : null} 
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