import React,{ useEffect, useState }  from 'react'

import {getAllChannels, getAllSubscribers, getAllSubs, removeSubscriber} from '../authModule/helper/helper'

import Select from 'react-select'

import Navbar from '../navbar/Navbar'

import styles from './styles/style.module.css';

// for table
import DataTable from 'react-data-table-component';

//MUI
import Button from '@mui/material/Button';

//seet alert
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

//import managePermission
//import {isAllowed} from '../permManager/ManagePerm'

const Administrator = (props) => {
  const [channels, setChannel]=useState([]); //to get the channel name
  const [allSubscibers, setallSubs]=useState([]); //to get all of the subscibers
  const [subscriber, setSubscriber] = useState([]); //to get the subscriber for channel
 
  // loading dat when the page is load
  useEffect(()=>{
    fetchChannels();
    featchSubscribers();
  },[])

  // get the channels
  const fetchChannels = async () => {
    try {
      const response = await getAllChannels();
      setChannel(response.data);
      //console.log(channels)
    } catch (error) {
      console.error(error);
    }
  };

  //set the channel to combo 
  const options = channels.map(channel => ({
    value: channel,
    label: channel
  }));

  //get all subscribers
  const featchSubscribers = async () => {
    try {
      const response = await getAllSubs();
      const fetchedSubs = response.data;
      setallSubs(fetchedSubs);

    } catch (error) {
      console.log(error)
    }
  }

  // selected channel
  const handleChannelSelect = (selectedOption) => {
    // Handle the selected channel here
    if (selectedOption) {

      getAllSubscribers(selectedOption.value)
      .then(response => {
        let subs = response.data;
        setSubscriber(subs);
        // console.log(subscriber);
      })
      .catch(error => {
        console.log(error);
      });
    }
    else{
      setSubscriber(!subscriber)
    }
  };

  // Data table
  const columns = [
    {
      name : 'Email',
      selector :  row => row.userId,
      sortable : true
    },
    {
      name : 'Trader Account',
      selector :  row => row.traderAccount,
      sortable : true
    },
    {
      name : 'Channel',
      selector :  row => row.channelName,
      sortable : true
    }
  ];

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const data = subscriber.length > 0 ? subscriber : allSubscibers;
    setRecords(data);
  }, [subscriber, allSubscibers]);

  // serch subscribers
  const handleSearch = (event) => {

    const searchValue = event.target.value.toLowerCase();

    if(searchValue !== ''){
      const newData = records.filter((row) => {
        return (
          row.channelName.toLowerCase().includes(searchValue) ||
          row.traderAccount.toLowerCase().includes(searchValue) ||
          row.userId.toLowerCase().includes(searchValue)
          )
      });
      setRecords(newData);
    }else{
      featchSubscribers()
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    //console.log(selectedRows);
  }, [selectedRows]);

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };
  
  // remove Subscriber
  const getSelectedRowDetails = () => {

    if(selectedRows.selectedCount === 0){
      //console.log('')
      Swal.fire({
        icon: 'question',
        text: 'First Select the Subscriber',
        showConfirmButton: true,
        //timer: 1500,
        customClass:{
          popup:'my-popup-class'
        }
      })
    }else{

      Swal.fire({
        title: 'Do you want to unsubscribe?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass:{
          popup:'my-popup-class'
        }
      }).then((result) => {
        if (result.isConfirmed) {

          const selected = selectedRows.selectedRows;

          const selectedRowDetails = selected.map((row) => ({
            userId: row.userId,
            traderAccount: row.traderAccount,
            channelName: row.channelName,
          }));

          removeSubscriber(selectedRowDetails)
          .then((responce) =>{
            if(responce){
              Swal.fire({
                icon: 'success',
                title: 'Remove Subscriber Success',
                showConfirmButton: false,
                timer: 1500,
                customClass:{
                  popup:'my-popup-class'
                }
              }).then(()=>{
                featchSubscribers(); // refresh the Subscriber  
              })
            }
          console.log(responce.status)
          })

        }else{
          console.log('not removed...!')
        }
      })

    }
  };

  // const TraderView = {
  //   showDelete:isAllowed('USER_DELETE'),
  //   showEdit:isAllowed('USER_EDIT'),
  //   showView:isAllowed('USER_VIEW') 
  // }

  // const { showDelete, showEdit, showView } = props;


  return (
    // if want there is Nav-bar\
    <>
    <Navbar/>
    <div className='container'>
      <div className='grid grid-cols-1'>

        <div className=" bg-slate-200 rounded-xl p-2"> 
        {/*  autocomplete for channels */}
        <div className='p-2'>
          {/* <label className='p-2 font-bold'>Select the Channels</label><br/>*/}
            {channels.length > 0 ? (
              <Select
                options={options}
                placeholder="Select the Channel"
                isClearable
                isSearchable
                className={styles.autoComplete}
                onChange={handleChannelSelect} 
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    //backgroundColor: '',
                    //color: 'white',
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    // backgroundColor: '#010b13', // Set dropdown background color to black
                    // color: 'white', // Set dropdown text color to white
                  }),
                  option: (baseStyles, { isFocused }) => ({
                    ...baseStyles,
                    //color: 'white', // Set dropdown option text color to white
                    //backgroundColor: isFocused ? '#303030' : 'transparent', // Set hover color to gray
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                   // color: 'white', // Set selected value text color to white
                  }),
                }}
              />
            ) : (
              <p>Loading...</p>
            )}

        </div>

          {/* load the all Subscriber of the channel */}
          <div className="bg-slate-100 p-5 rounded-xl mx-3 ">
           
            {/* search record */}
            <div className='text-end p-2'>
              <input type="text" 
              placeholder='Search Here...'
              onChange={handleSearch}
              className='rounded-lg bg-slate-300 border border-cyan-100 outline-none py-1 px-2 w-full md:w-1/2'/>
            </div>

            {/* Data table */}
            <DataTable
              columns={columns}
              data ={records}
              selectableRows
              onSelectedRowsChange={handleSelectedRowsChange}
              fixedHeader
              pagination
              className='z-0'
              customStyles={{
                table: {
                  style: {
                    //backgroundColor: 'transparent', // Set the background color of the table to transparent
                   // font:'white',
                  },
                },
                headRow: {
                  style: {
                    //backgroundColor: '#1a202b', // Set the background color of the table header row to transparent
                    //color: 'white',
                    //fontWeight: 'bold',
                    fontSize:'18px',
                  },
                },
                rows: {
                  style: {
                    backgroundColor: 'transparent', // Set the background color of the table rows to transparent
                   // color: 'white',
                    fontSize:'16px',
                  },
                },
                pagination:{
                  style: {
                    backgroundColor: 'transparent', // Set the background color of the table rows to transparent
                   // color: 'white',
                    fontSize:'16px',
                    
                  },
                },
              }}
            />
          </div>

          {
            props.showDelete ? (
              <div className='float-right m-3'>
                {/* <button 
                className='bg-red-700 p-2 rounded-xl'
                onClick = {() => getSelectedRowDetails()}
                >Remove</button> */}

                <Button 
                variant='contained'
                color='error'
                sx={{borderRadius:3}} 
                onClick = {() => getSelectedRowDetails()}
                >Remove</Button>

              </div>) : ''
          }
        
        </div>
      </div>
    </div>
    </>
  )
}

export default Administrator