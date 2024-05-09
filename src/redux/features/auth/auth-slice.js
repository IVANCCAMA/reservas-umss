import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authLogin } from '../../../services/Auth/Auth.service.js';
import { storageDelete, storageGet, storageSave } from '../../Storage/Storage.js';

export const loginRequest = createAsyncThunk('auth/loginRequest', async (userLoginAttempt) => {
  const response = await authLogin(userLoginAttempt);
  /* console.log('Logeando...', response.data); */
  return response.data;
});

const initialState = {
  token: null,
  usuarios: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    checkAuthorization(state) {
      const token = storageGet('token');
      const usuarios = storageGet('usuarios');
      if (token && usuarios) {
        state.usuarios = usuarios;
        state.token = token;
      }
    },
    logout(state) {
      state.usuarios = null;
      state.token = null;
      storageDelete('usuarios');
      storageDelete('token');
    },
  },
  extraReducers: (builder) => {
    /* console.log('intentado extraReducers', builder); */
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      /* console.log('intentadooooo', action); */
      action.payload.token = '123qweasdTokenDefault';
      if (action.payload.usuarios && action.payload.token) {
        /* console.log('extraReducers>>>', action.payload.usuarios); */
        state.usuarios = action.payload.usuarios;
        state.token = action.payload.token;
        storageSave('usuarios', action.payload.usuarios);
        storageSave('token', action.payload.token);
      }
    });
  },
});

export const { checkAuthorization, logout } = authSlice.actions;
export default authSlice.reducer;
