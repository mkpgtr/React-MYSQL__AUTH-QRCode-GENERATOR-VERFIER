export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };
  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');

    if(result===undefined){
      return null
    }
    
    const user = result ? JSON.parse(result) : null;

    return user;
  };