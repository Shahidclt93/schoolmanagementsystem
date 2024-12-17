import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


// User login
export const login = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const payload = { email, password };
      const response = await axiosInstance.post("/signin", payload);
      const { token, user } = response.data;
      return { user, token }; // Return user details and token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// User logout
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error logging out");
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, 
    token: null, 
    isAuthenticated:false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
