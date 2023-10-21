import customFetch from '../utils/axios';

export const registerUserThunk = async (url, user, thunkAPI) => {
    console.log(user)
    try {
      const resp = await customFetch.post(url, user);


      
      return resp.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  };
  
  export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
      const resp = await customFetch.post(url, user);
      console.log(resp)
      return resp.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  };

//   export const clearStoreThunk = async (message, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(logoutUser(message));
//       thunkAPI.dispatch(clearAllJobsState());
//       thunkAPI.dispatch(clearValues());
//       return Promise.resolve();
//     } catch (error) {
//       return Promise.reject();
//     }
//   };