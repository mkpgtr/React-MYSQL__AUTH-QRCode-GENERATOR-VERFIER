import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUserThunk, registerUserThunk } from "./userThunk";
import { addUserToLocalStorage, getUserFromLocalStorage } from "../utils/localStorage";

import {toast} from 'react-toastify'
import { createQrCodeThunk, deleteQrCodeThunk, getAllQrCodesThunk } from "./qrCodesThunk";

// export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);





export const createQrCode = createAsyncThunk(
    'qrCodes/createQrCode',
    async (qrCodeDetails, thunkAPI) => {
        return createQrCodeThunk('/qrCodes/', qrCodeDetails, thunkAPI);
    }
);
export const deleteQrCode = createAsyncThunk(
    'qrCodes/deleteQrCode',
    async (qrCodeId,thunkAPI) => {
        return deleteQrCodeThunk('/qrCodes/', qrCodeId,thunkAPI);
    }
);

export const getAllQrCodes = createAsyncThunk(
    'qrCodes/getAllQrCodes',
    async (thunkAPI) => {
        return getAllQrCodesThunk('/qrCodes/', thunkAPI);
    }
);

export const qrCodesSlice = createSlice({
    name: 'qrCodes',

    initialState: {
        isLoading: false,
        isJWTInvalid : false,
        qrCodes : [],
        needsARefresh : false,
        lastCreatedQr : {}
        
    },

    reducers: {
       toggleJWTValidity : (state)=>{
        state.isJWTInvalid = !state.isJWTInvalid
       },
       toggleRefresh:(state)=>{
        state.needsARefresh = !state.needsARefresh
       }
    },
    extraReducers:(builder)=>{
        

        builder
        .addCase(createQrCode.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(createQrCode.fulfilled, (state,{payload}) => {
            state.isLoading = false;
            console.log(payload)
            state.lastCreatedQr = payload.qr
            toast.success(payload.message)
        })

        .addCase(createQrCode.rejected, (state, { payload }) => {
            state.isLoading = false;
            console.log(payload)
            if(payload ==='jwt is not valid'){

                toast.error(payload)
                state.isJWTInvalid = true
            }
            toast.error(payload)

        })
        .addCase(getAllQrCodes.pending, (state,{payload}) => {
            state.isLoading = true;
            console.log(payload)
        })
         .addCase(getAllQrCodes.fulfilled, (state,{payload}) => {
            state.isLoading = false;
            state.qrCodes = payload.data
            console.log(payload)
        })
        .addCase(getAllQrCodes.rejected, (state,{payload}) => {
            state.isLoading = false;
            console.log(payload)
        })
        .addCase(deleteQrCode.pending, (state,{payload}) => {
            state.isLoading = true;
            console.log(payload)
        })
        .addCase(deleteQrCode.fulfilled, (state,{payload}) => {
            state.isLoading = false;
            console.log(payload)
            state.needsARefresh  = true
            toast.success(payload.message)

        })
        .addCase(deleteQrCode.rejected, (state,{payload}) => {
            state.isLoading = false;
            console.log(payload)
        })
    }
   
})

export const {toggleJWTValidity,toggleRefresh } = qrCodesSlice.actions

export default qrCodesSlice.reducer