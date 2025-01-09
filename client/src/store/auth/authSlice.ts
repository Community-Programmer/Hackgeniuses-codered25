import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

  
  const initialState = {
    isLoggedIn : false,
    user: null,
    accessToken: null,
    loading: true
  };

  // interface LoginData {
  //   email: string;
  //   password: string;
  // }

  // export const login = createAsyncThunk(
  //   'auth/login',
  //   async (data: LoginData, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.post('http://localhost:5050/api/v1/auth/signin', data, { withCredentials: true });
  //       return response.data.accessToken;
  //     } catch (err) {
  //       if (axios.isAxiosError(err) && err.response) {
  //         return rejectWithValue(err.response.data.message || 'Login failed. Please try again.');
  //       }
  //       return rejectWithValue('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // );

  export const silentRefresh = createAsyncThunk('auth/silentRefresh', async (_, { dispatch }) => {
    try {
      const response = await axios.post('http://localhost:5050/api/v1/auth/refresh', {}, { withCredentials: true });
      return response.data.accessToken;
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  });


  const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      setAccessToken: (state, action) => {
        state.accessToken = action.payload;
        state.loading = false;
      },
      logout: (state) => {
        state.accessToken = null;
        state.loading = false;
      },
    },
    extraReducers: (builder) => {
      // builder.addCase(login.fulfilled, (state, action) => {
      //   state.accessToken = action.payload;
      // });
      builder.addCase(silentRefresh.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(silentRefresh.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload;
        state.loading = false;
      });
      builder.addCase(silentRefresh.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
    },
  });

  export const { setAccessToken, logout } = authSlice.actions;

  export default authSlice.reducer;


