import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authLogin } from '../../../services/Auth/Auth.service.js';
import { storageGet, storageDelete, storageSave } from '../../../services/Storage/Storage.js';

export const loginRequest = createAsyncThunk('auth/loginRequest', async (userLoginAttempt) => {
  const response = await authLogin(userLoginAttempt);
  return response.data;
});

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    checkAuthorization(state) {
      const token = storageGet('token');
      const user = storageGet('user');
      if (token && user) {
        state.user = user;
        state.token = token;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      storageDelete('user');
      storageDelete('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      if (action.payload.user && action.payload.token) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        storageSave('user', action.payload.user);
        storageSave('token', action.payload.token);
      }
    });
  },
});

export const { checkAuthorization, logout } = authSlice.actions;
export default authSlice.reducer;
