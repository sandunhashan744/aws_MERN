import Permission from '../models/Permission.js';
import Roles from '../models/Roles.js';

// import permissions from "../permission.json" assert { type: 'json' };
import permissions from '../dataDB/permission.js'
//import Roles data
import roles from '../dataDB/roles.js'
  
  // const roles = [
  //   {
  //     roleName: 'subscriber',
  //     roleId: 1
  //   },
  //   {
  //     roleName: 'provider',
  //     roleId: 2
  //   },
  //   {
  //     roleName: 'administrator',
  //     roleId: 3,
  //     permission: [123,456,789]
  //   },
  //   {
  //     roleName: 'superUser',
  //     roleId: 4,
  //     permission: [123,789]
  //   },
  //   {
  //     roleName: 'manager',
  //     roleId: 5,
  //     permission: [456,789]
  //   }

  // ];

  //insert roles
  
  export async function insertRoles(req, res){
    try {

      // const { permission } = roles
      //   console.log(permission)
      //   return res.status(202).send(roles);

        Roles.insertMany(roles)
        .then(savedRoles => {
            console.log('Roles saved:', savedRoles);
            return res.status(202).send(savedRoles);
        })
        .catch(error => {
            console.error('Error saving Roles:', error);
            return res.status(404).send(error);
        });
        
    } catch (error) {
        console.error( error);
    }
  }

  //clear roles
  export async function removeRoles(req, res) {
    try {
      const result = await Roles.deleteMany({});
      //console.log('Permissions cleared:', result.deletedCount, 'documents deleted');
      return res.status(202).send(result);

    } catch (error) {
     // console.log(error)
      return res.status(404).send(error);
    }
  }

  //insert Permissions
  export async function insertPermission(req, res) {
    try {
      const savedPermissions = await Permission.insertMany(permissions);
        //console.log('Permissions saved:', savedPermissions);
        return res.status(202).send(savedPermissions)

    } catch (error) {
        //console.error('Error saving permissions:', error);
        return res.status(404).send(error)   
    }
  }
  
  //clear all recodes of permission table
  export async function removePermissions(req, res) {
    try {
      const result = await Permission.deleteMany({});
      //console.log('Permissions cleared:', result.deletedCount, 'documents deleted');
      return res.status(202).send(result);

    } catch (error) {
     // console.log(error)
      return res.status(404).send(error);
    }
  }

