
//check the logingUser permissions allocates 
export function isAllowed(pem) {
  const logUserPem = localStorage.getItem('permission');
  
  //console.log(logUserPem)

  if (logUserPem !== null) {
    return logUserPem.includes(pem);
  } else {
    // Handle the case when logUserPem is null (or not set in localStorage)
    return false;
  }

  //return logUserPem.includes(pem);
}
