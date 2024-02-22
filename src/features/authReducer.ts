import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface IAuth {
  isAuthorized: boolean;
  token: string;
  user: UserFromServer | null,
}

export interface UserFromServer {
  name: string,
  surname: string,
  email: string,
}

export interface IAuthFormData {
  email: string;
  password: string;
  name?: string,
  surname?: string,
}

const tokenFromLocalStorage = localStorage.getItem('token') || '';
const userFromLocalStorageString = localStorage.getItem('user');
const userFromLocalStorage = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;

const auth: IAuth = {
  isAuthorized: tokenFromLocalStorage ? true : false,
  token: tokenFromLocalStorage,
  user: userFromLocalStorage,
};

const authReducer = createSlice({
  name: 'auth',
  initialState: auth,
  reducers: {
    signout: (state) => {
      state.isAuthorized = false;
      state.token = '';
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authorize.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthorized = true,
      state.token = action.payload.token;
    })
    
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })

    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.isAuthorized = false;
      state.token = '';
      state.user = null;
    })
  },
});

export const { actions } = authReducer;
export default authReducer.reducer;

interface IAuthArguments {
  endpoint: string;
  formData: IAuthFormData;
}

export const authorize = createAsyncThunk(
  'auth/authorize',
  async ({ endpoint, formData }: IAuthArguments, thunk) => {
    try {
      const response = await axios.post(`https://server-store-y08r.onrender.com/${endpoint}`, formData);

      return response.data;
    } catch (error: any) {

      return thunk.rejectWithValue(error.response.data.message)
    }
  }
);

export interface IServerUpdate {
  endpoint: string,
  formData: {
    name: string,
    surname: string,
    email: string,
  },
  token: string,
}

export const update = createAsyncThunk(
  'auth/update',
  async ({ endpoint, formData, token }: IServerUpdate, thunk) => {
    try {
      const response = await axios.patch(`https://server-store-y08r.onrender.com/${endpoint}`, formData, { headers: { authorization: token }});

      return response.data;
    } catch (error: any) {

      return thunk.rejectWithValue(error.response.data.message)
    }
  }
);

export interface IDeleteAccount {
  email: string | undefined,
  token: string,
}

export const deleteAccount = createAsyncThunk(
  'auth/delete',
  async ({ email, token }: IDeleteAccount) => {
    try {
      const response = await axios.delete('https://server-store-y08r.onrender.com/deleteAccount', {
        data: {
          email
        },
        headers: { authorization: token }
      });

      return response.data;
    } catch (error) {
      return error;
    }
})
