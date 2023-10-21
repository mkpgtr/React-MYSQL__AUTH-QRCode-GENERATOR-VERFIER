import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUserThunk, registerUserThunk } from "./userThunk";
import { addUserToLocalStorage, getUserFromLocalStorage } from "../utils/localStorage";

import {toast} from 'react-toastify'

// export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);





export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        console.log(user)
        return registerUserThunk('/auth/register', user, thunkAPI);
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI);
    }
);

export const userSlice = createSlice({
    name: 'user',

    initialState: {
        isLoading: false,
        registrationSuccess : false,
        user:getUserFromLocalStorage()?.userUsername ? getUserFromLocalStorage() : {}
    },

    reducers: {
        clearUserFromState : (state)=>{

            state.user = {}
        },
        toggleRegistrationSuccess : (state)=>{
            state.registrationSuccess = !state.registrationSuccess
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
              
                state.isLoading = false;
                if(payload.message==='Account Created successfully'){
                    toast.success(`${payload.message} Please login to continue`);
                    state.registrationSuccess = true
                }
                console.log(payload)
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(payload);
                console.log(payload)
                toast.error(payload)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                console.log(payload)
                const { data:user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user)

                toast.success(`Welcome ${user?.userFullName || 'User'}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                console.log(payload)
                toast.error(payload);
                
            })
    }
})

export const { clearUserFromState,toggleRegistrationSuccess} = userSlice.actions

export default userSlice.reducer