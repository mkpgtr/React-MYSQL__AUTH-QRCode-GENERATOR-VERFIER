import customFetch from '../utils/axios';

export const createQrCodeThunk = async (url, qrCodeDetails, thunkAPI) => {
    try {
      const resp = await customFetch.post(url, qrCodeDetails);


      
      return resp.data;
    } catch (error) {
        console.log(error.response.data.message)
        
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  };

  export const getAllQrCodesThunk = async (url, thunkAPI) => {
    try {
      const resp = await customFetch.get(url);


      
      return resp.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  };

  
  export const deleteQrCodeThunk = async (url,qrCodeId, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`${url}${qrCodeId}`);


      
      return resp.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  };