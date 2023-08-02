// import Roles from "../models/Roles.js";
// import Permission from "../models/Permission.js";

// export async function getPermissions(req, res){
    
//     const {role} = req.params;
  
//     try {
//        const permission = await Roles.findOne({roleId : role})
//         //console.log(permission)
        
//         return res.status(202).send(permission)
        
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }


// ///load the page permission

// export async function pagePermission(req, res){
    
//     const {entity} = req.params;
  
//     try {
//        const pagePermission = await Permission.find({entity : entity})
//       //  console.log(pagePermission)
        
//         return res.status(202).send(pagePermission)
        
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }