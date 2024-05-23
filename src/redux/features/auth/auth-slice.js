import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authLogin } from '../../../services/Auth/Auth.service.js';
import { storageDelete, storageGet, storageSave } from '../../Storage/Storage.js';

export const loginRequest = createAsyncThunk('auth/loginRequest', async (userLoginAttempt) => {
  const response = await authLogin(userLoginAttempt);
  return response.data;
});

const initialState = {
  token: null,
  usuario: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    checkAuthorization(state) {
      const token = storageGet('token');
      const usuario = storageGet('usuario');
      if (token && usuario) {
        state.usuario = usuario;
        state.token = token;
      }
    },
    logout(state) {
      state.usuario = null;
      state.token = null;
      storageDelete('usuario');
      storageDelete('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      console.log(state, action);
      /* Simulación de token */
      action.payload.token = crypto.randomUUID();

      if (action.payload.usuario && action.payload.token) {
        state.usuario = action.payload.usuario;
        state.token = action.payload.token;
        storageSave('usuario', action.payload.usuario);
        storageSave('token', action.payload.token);
      }
    });
  },
});

export const { checkAuthorization, logout } = authSlice.actions;
export default authSlice.reducer;
