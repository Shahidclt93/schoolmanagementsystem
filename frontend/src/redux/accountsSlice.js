import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


// Fetch all staff
export const fetchStaffs = createAsyncThunk(
  "accounts/fetchStaffs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; 
      const response = await axiosInstance.get(`staff/staffs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all librarians
export const fetchLibrarians = createAsyncThunk(
  "accounts/fetchLibrarians",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axiosInstance(`librarian/librarians`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new account
export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async (accountData , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axiosInstance.post(`admin/create-account`, accountData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Edit an account
export const editAccount = createAsyncThunk(
  "accounts/editAccount",
  async ({ id, accountData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axiosInstance.put(`admin/edit-account/${id}`, accountData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete an account
export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axiosInstance.delete(`admin/delete-account/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice 
const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    staffs: [],
    librarians: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetSuccessMessage(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Staffs
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload.data;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Librarians
      .addCase(fetchLibrarians.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibrarians.fulfilled, (state, action) => {
        state.loading = false;
        state.librarians = action.payload.data;
      })
      .addCase(fetchLibrarians.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Account
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Account
      .addCase(editAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(editAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetSuccessMessage } = accountsSlice.actions;

export default accountsSlice.reducer;
