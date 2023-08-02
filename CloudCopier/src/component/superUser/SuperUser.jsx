import React,{ useEffect, useState }  from 'react'
//import Navbar from './Navbar'
import Navbar from '../navbar/Navbar';

import Select from 'react-select'
import {getAllUser, getUserDetails, updateUserRole, getRoles} from '../authModule/helper/helper'
import styles from './styles/style.module.css';

//mui
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

//seet alert
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const SuperUser = () => {
    const [users, setUser]=useState([]); //to get the Users
    const [userData, setUserData]=useState([]); //to get the Users
    const [selectedUserRole, setSelectedUserRole] = useState('');
    const [userRole, setUserRole] = useState([]);
    
    // loading dat when the page is load
    useEffect(()=>{
        fetchUsers();
        loaadUserRoles();
        //featchSubscribers();
        
    },[])

    // Load the Userroles
    function loaadUserRoles() {
       // console.log('first')
        getRoles()
        .then((responce) =>{
            if(responce){
                setUserRole(responce.data)
                console.log(responce.data)
            }
        })
    }

    // get the channels
    const fetchUsers = async () => {
        try {
          const response = await getAllUser();
          setUser(response.data);
          //console.log(channels)
        } catch (error) {
          console.error(error);
        }
      };
    //set the User to combo 
    const options = users.map(user => ({
        value: user,
        label: user
    }));

    //load the selected user Details
    const handleUserSelect = (selectedOption) => {
       // Handle the selected channel here
      // console.log(selectedOption.value)
        if (selectedOption) {
           getUserDetails(selectedOption.value)
          .then(response => {
            let user = response.data;
            setUserData(user);  
            setSelectedUserRole(user[0].userRoles)
          
          })
          .catch(error => {
            console.log(error);
          });
        }
        else{
            setUserData(!userData);
            setSelectedUserRole(!selectedUserRole);
        }
    };

    // handel the user role
    const handleUserRoleChange = (event) => {
        const newRole = event.target.value;
        setSelectedUserRole(newRole);
        // Update the user role in the state or make an API call to update the user role in the database
    };

    // handel the Updete
    const handleUpdateUserRole = () => {
        let oldRole = userData ? userData[0].userRoles : "";
        
        let email = userData ? userData[0].email : "";

        if(oldRole !== selectedUserRole){
            //alert('update')
            updateUserRole({selectedUserRole,email})
            .then((response) =>{
                if(response){
                    Swal.fire({
                        icon: 'success',
                        title: 'Update User Role Success',
                        showConfirmButton: false,
                        timer: 1500,
                        customClass:{
                          popup:'my-popup-class'
                        }
                    })
                }
            })
        }else{
            Swal.fire({ 
                icon: 'error',
                text: 'Change User the Role First!',
                customClass:{
                    popup:'my-popup-class'
                }
            })
        }
    }

    //console.log(userRole.roleId)

  return (
    <>
    <Navbar/>
    <div className='container'>
        <div className='grid grid-cols-1'>
            <div className=" bg-slate-100 rounded-xl p-2"> 
            {/*  autocomplete for users */}
            <div className='p-2 mb-10'>
            {/* <label className='p-2 font-bold'>Select the User</label><br/>             */}
                {users.length > 0 ? (
                <Select
                    options={options}
                    placeholder="Select The User"
                    isClearable
                    isSearchable
                    className={styles.autoComplete}
                    onChange={handleUserSelect} 
                    styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        //color: 'white',
                       // backgroundColor: '#0f172a',
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                       // backgroundColor: '#0f172a', // Set dropdown background color to black
                        //color: 'white', // Set dropdown text color to white
                    }),
                    option: (baseStyles, { isFocused }) => ({
                        ...baseStyles,
                        //color: 'white', // Set dropdown option text color to white
                        //backgroundColor: isFocused ? '#303030' : 'transparent', // Set hover color to gray
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        //color: 'white', // Set selected value text color to white
                    }),
                    }}
                />
                ) : (
                <p>Loading...</p>
                )}

            </div>
           
            {userData.length > 0 ? (
            <>
                <span className='m-5 text-lg mb-10 font-semibold'>User Details</span>
                <hr />

                <div className='grid md:grid-cols-4 grid-cols-1 my-5 px-5 pb-10 gap-5'>
                    <div>
                        Name : <spam>{userData ? userData[0].firstName + ' ' + userData[0].lastName : ''}</spam>
                    </div>
                    <div>
                    MetaTrade : <spam>{userData ? userData[0].metaTrade : ""}</spam>
                    </div>
                    <div>
                        Email : <spam>{userData ? userData[0].email : ""}</spam>
                    </div>
                    <div>
                        User Role : 
                        <select 
                        className='bg-transparent ml-2 border p-1 rounded-lg '
                        value={selectedUserRole}
                        onChange={handleUserRoleChange}
                        style={{ background: '#cbd5e1' }}
                        >

                        {userRole.map((role) => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.roleName}
                            </option>
                        ))}

                        </select>   
                    </div>
                </div>
            </>
            )
            :(
            <></>
            )
            }

            {/* <span className='m-5 text-lg '>User Permiton</span>
            <hr /> */}

            <div className='float-right m-3 py-5'>
                {userData.length > 0 ?(
                    <Button 
                    variant='contained' 
                    color='primary'
                    sx={{borderRadius:3}} 
                    onClick={handleUpdateUserRole}
                    >Update</Button>
                ):(
                    <Button 
                    variant='contained' 
                    color='primary'
                    sx={{borderRadius:3}} 
                    disabled 
                    >Update</Button>
                )}
            </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default SuperUser